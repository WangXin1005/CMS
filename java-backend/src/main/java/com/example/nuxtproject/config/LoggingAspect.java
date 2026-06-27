package com.example.nuxtproject.config;

import java.lang.reflect.Method;
import java.util.Optional;
import com.example.nuxtproject.entity.OperationLog;
import com.example.nuxtproject.service.OperationLogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.SerializationFeature;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.persistence.EntityManager;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.annotation.PostConstruct;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Map;
import java.util.HashMap;

@Aspect
@Component
public class LoggingAspect implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext ctx) {
        this.applicationContext = ctx;
    }


    private final OperationLogService logService;
    private final ObjectMapper objectMapper;
    private final EntityManager entityManager;

    /** 控制器名 -> 实体类映射 */
    private static final Map<String, Class<?>> ENTITY_MAP = new HashMap<>();
    static {
        ENTITY_MAP.put("Article", com.example.nuxtproject.entity.Article.class);
        ENTITY_MAP.put("Category", com.example.nuxtproject.entity.Category.class);
        ENTITY_MAP.put("Tag", com.example.nuxtproject.entity.Tag.class);
        ENTITY_MAP.put("User", com.example.nuxtproject.entity.User.class);
        ENTITY_MAP.put("Comment", com.example.nuxtproject.entity.Comment.class);
        ENTITY_MAP.put("Media", com.example.nuxtproject.entity.Media.class);
        ENTITY_MAP.put("SiteSetting", com.example.nuxtproject.entity.SiteSetting.class);
    }

    public LoggingAspect(OperationLogService logService, ObjectMapper objectMapper, EntityManager entityManager) {
        this.logService = logService;
        this.objectMapper = objectMapper;
        this.entityManager = entityManager;
        this.objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @PostConstruct
    public void init() {
        System.out.println("[LoggingAspect] initialized successfully");
    }

    @Around("execution(* com.example.nuxtproject.controller.*.*(..)) " +
            "&& !execution(* com.example.nuxtproject.controller.OperationLogController.*(..)) " +
            "&& (execution(* com.example.nuxtproject.controller.*.create*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.add*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.register*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.init*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.update*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.edit*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.change*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.delete*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.remove*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.login*(..)) " +
            ")")
    public Object logOperation(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("[ASPECT] intercepted: " + joinPoint.getSignature().getName());
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getMethod().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName().replace("Controller", "").split("\\$\\$")[0];
        String action;
        if (methodName.startsWith("create") || methodName.startsWith("add") || methodName.startsWith("register") || methodName.startsWith("init")) action = "CREATE";
        else if (methodName.startsWith("update") || methodName.startsWith("edit") || methodName.startsWith("change")) action = "UPDATE";
        else if (methodName.startsWith("delete") || methodName.startsWith("remove")) action = "DELETE";
        else if (methodName.startsWith("login")) action = "LOGIN";
        else action = "OTHER";

        // 前置加载原始数据（仅获取基本字段，避免懒加载异常）
        String oldDataJson = null;
        Long entityId = extractEntityId(joinPoint.getArgs());
        if ("UPDATE".equals(action) || "DELETE".equals(action)) {
            if (entityId != null) oldDataJson = loadOldEntityJson(className, entityId);
        }

        Object proceed;
        String result = "SUCCESS";
        String errorMsg = null;
        try {
            proceed = joinPoint.proceed();
        } catch (Throwable t) {
            result = "FAIL";
            errorMsg = t.getMessage();
            throw t;
        } finally {
            try {
                String username = "";
                String role = "";
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
                    Object principal = auth.getPrincipal();
                    if (principal instanceof com.example.nuxtproject.entity.UserPrincipal up) {
                        username = up.username();
                        role = up.role();
                    } else {
                        String name = auth.getName();
                        username = name != null && name.length() > 50 ? name.substring(0, 50) : name;
                        role = auth.getAuthorities().stream().findFirst().map(g -> g.getAuthority().replace("ROLE_", "")).orElse("");
                    }
                }

                HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
                String path = request.getRequestURI();

                String clientIp = request.getRemoteAddr(); if (clientIp != null && clientIp.length() > 50) clientIp = clientIp.substring(0, 50);
                String details = className + " " + action + " " + path;

                // 构建含新旧数据的数据字段
                String newDataJson = captureArgsAsJson(joinPoint);
                String dataStr = buildDataString(action, oldDataJson, newDataJson);
                if (dataStr != null) {
                    details = details + " | 数据: " + dataStr;
                }

                if (role.isEmpty()) {
                    role = "ANONYMOUS";
                    for (Object arg : joinPoint.getArgs()) {
                        if (arg != null) {
                            try {
                                Method m = arg.getClass().getMethod("getUsername");
                                Object u = m.invoke(arg);
                                if (u instanceof String && !((String) u).isEmpty()) { username = (String) u; break; }
                            } catch (NoSuchMethodException ignored) { }
                        }
                    }
                }

                final OperationLog log = new OperationLog(username, role, action, className, entityId, details, path, result, errorMsg, clientIp);
                logService.save(log);
            } catch (Exception logEx) { System.err.println("[LOG_ERROR] " + logEx.getMessage()); logEx.printStackTrace(); }
        }
        return proceed;
    }

    /** 构建含新旧数据对比的 JSON 字符串 */
    private String buildDataString(String action, String oldDataJson, String newDataJson) {
        try {
            if ("UPDATE".equals(action) && oldDataJson != null && newDataJson != null) {
                // {o: {old data}, n: {new data}}
                Map<String, Object> wrapper = new HashMap<>();
                wrapper.put("o", objectMapper.readValue(oldDataJson, Object.class));
                wrapper.put("n", objectMapper.readValue(newDataJson, Object.class));
                String result = objectMapper.writeValueAsString(wrapper);
                return result.length() > 30000 ? result.substring(0, 30000) + "..." : result;
            } else if (newDataJson != null && !newDataJson.isEmpty()) {
                return newDataJson.length() > 30000 ? newDataJson.substring(0, 30000) + "..." : newDataJson;
            }
        } catch (Exception ignored) {}
        return null;
    }

    /** 通过 EntityManager 加载旧实体数据并序列化为 JSON（排除 content 等长文本字段） */
    private String captureOldEntityJson(String className, Long entityId) {
        try {
            Class<?> entityClass = ENTITY_MAP.get(className);
            if (entityClass == null) return null;
            Object entity = entityManager.find(entityClass, entityId);
            if (entity == null) return null;
            // 使用独立的 ObjectMapper，排除 content 等长文本字段
            ObjectMapper mapper = new ObjectMapper();
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            String json = mapper.writerWithView(Object.class)
                .writeValueAsString(entity);
            // 截断 content 等超长字段
            json = truncateLongFields(json, 200);
            return json != null && !"{}".equals(json) ? json : null;
        } catch (Exception e) {
            System.err.println("[LOG_OLD_DATA_ERROR] " + e.getMessage());
            return null;
        }
    }

    /** 截断 JSON 中过长字段值 */
    private String truncateLongFields(String json, int maxLen) {
        if (json == null || json.length() < maxLen * 2) return json;
        // 简单截断：整体截断
        return json.length() > 10000 ? json.substring(0, 10000) + "..." : json;
    }

    private Long extractEntityId(Object[] args) {
        for (Object arg : args) { if (arg instanceof Number) return ((Number) arg).longValue(); }
        return null;
    }

    private String captureArgsAsJson(ProceedingJoinPoint joinPoint) {
        try {
            for (Object arg : joinPoint.getArgs()) {
                if (arg == null || arg instanceof Number || arg instanceof String || arg instanceof HttpServletRequest
                    || arg instanceof org.springframework.web.multipart.MultipartFile
                    || arg instanceof com.example.nuxtproject.entity.UserPrincipal) continue;
                String json = objectMapper.writeValueAsString(arg);
                if (json != null && !json.equals("{}")) return json;
            }
        } catch (Exception ignored) {}
        return null;
    }

    private String loadOldEntityJson(String entityName, Long entityId) {
        try {
            String cleanName = entityName.contains("$") ? entityName.substring(0, entityName.indexOf("$")) : entityName;
            String repoName = cleanName.substring(0, 1).toLowerCase() + cleanName.substring(1) + "Repository";
            Object repo = applicationContext.getBean(repoName);
            Optional<?> result = (Optional<?>) repo.getClass().getMethod("findById", Object.class).invoke(repo, entityId);
            if (result.isPresent()) {
                Object entity = result.get();
                java.util.Map<String, Object> fields = new java.util.LinkedHashMap<>();
                for (java.lang.reflect.Method m : entity.getClass().getMethods()) {
                    String name = m.getName();
                    if (name.startsWith("get") && m.getParameterCount() == 0 && m.getReturnType() != void.class && !name.equals("getClass")) {
                        String field = Character.toLowerCase(name.charAt(3)) + name.substring(4);
                        if (field.equals("hibernateLazyInitializer") || field.equals("handler")) continue;
                        try {
                            Object val = m.invoke(entity);
                            if (val != null && !(val instanceof java.util.Collection) && !val.getClass().getName().contains("$$")) {
                                fields.put(field, val);
                            }
                        } catch (Exception ignored) {}
                    }
                }
                if (!fields.isEmpty()) return objectMapper.writeValueAsString(fields);
            }
        } catch (Exception ignored) {}
        return null;
    }

}
