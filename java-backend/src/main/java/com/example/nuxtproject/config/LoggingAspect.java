/**
 * 操作日志切面 — 拦截控制器写操作，自动记录操作日志（创建/更新/删除/登录）。
 */
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;

@Aspect
@Component
public class LoggingAspect implements ApplicationContextAware {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

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
        ENTITY_MAP.put("Media", com.example.nuxtproject.entity.Media.class);
        ENTITY_MAP.put("SiteSetting", com.example.nuxtproject.entity.SiteSetting.class);
    }
    /** 实体类显示名称 */
    private static final java.util.Map<String, String> ENTITY_NAME_MAP = new java.util.HashMap<>();
    static {
        ENTITY_NAME_MAP.put("Article", "文章");
        ENTITY_NAME_MAP.put("Category", "分类");
        ENTITY_NAME_MAP.put("Tag", "标签");
        ENTITY_NAME_MAP.put("User", "用户");
        ENTITY_NAME_MAP.put("Media", "文件");
        ENTITY_NAME_MAP.put("SiteSetting", "站点设置");
    }

    /** 操作类型显示名称 */
    private static final java.util.Map<String, String> ACTION_NAME_MAP = new java.util.HashMap<>();
    static {
        ACTION_NAME_MAP.put("CREATE", "创建");
        ACTION_NAME_MAP.put("UPDATE", "修改");
        ACTION_NAME_MAP.put("DELETE", "删除");
        ACTION_NAME_MAP.put("UPLOAD", "上传");
        ACTION_NAME_MAP.put("APPROVE", "审核通过");
        ACTION_NAME_MAP.put("REJECT", "驳回");
        ACTION_NAME_MAP.put("LOGIN", "登录");
        ACTION_NAME_MAP.put("LOGOUT", "退出");
        ACTION_NAME_MAP.put("OTHER", "其他操作");
    }


    public LoggingAspect(OperationLogService logService, ObjectMapper objectMapper, EntityManager entityManager) {
        this.logService = logService;
        this.objectMapper = objectMapper;
        this.entityManager = entityManager;
        this.objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @PostConstruct
    public void init() {
        logger.info("[LoggingAspect] initialized successfully");
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
            "|| execution(* com.example.nuxtproject.controller.*.logout*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.submit*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.approve*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.reject*(..)) " +
            "|| execution(* com.example.nuxtproject.controller.*.upload*(..)) " +
            ")")
    public Object logOperation(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("[ASPECT] intercepted: " + joinPoint.getSignature().getName());
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getMethod().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName().replace("Controller", "").split("\\$\\$")[0];
        String action;
        if (methodName.startsWith("create") || methodName.startsWith("add") || methodName.startsWith("register") || methodName.startsWith("init")) action = "CREATE";
        else if (methodName.startsWith("update") || methodName.startsWith("edit") || methodName.startsWith("change")) action = "UPDATE";
        else if (methodName.startsWith("delete") || methodName.startsWith("remove")) action = "DELETE";
        else if (methodName.startsWith("upload")) action = "UPLOAD";
        else if (methodName.startsWith("submit")) action = "CREATE";
        else if (methodName.startsWith("approve")) action = "APPROVE";
        else if (methodName.startsWith("reject")) action = "REJECT";
        else if (methodName.startsWith("logout")) action = "LOGOUT";
        else if (methodName.startsWith("login")) action = "LOGIN";
        else action = "OTHER";

        // 前置加载原始数据（仅获取基本字段，避免懒加载异常）
        String oldDataJson = null;
        Long entityId = extractEntityId(joinPoint.getArgs());
        if ("UPDATE".equals(action) || "DELETE".equals(action) || "APPROVE".equals(action) || "REJECT".equals(action)) {
        // SiteSetting 特殊处理：按 key 查找旧数据（entityId 为 null 因为参数中无 Number 类型 ID）
        if (oldDataJson == null && "SiteSetting".equals(className) && "UPDATE".equals(action)) {
            logger.info("[SITE_SETTING_LOG] attempting old data lookup");
            for (Object arg : joinPoint.getArgs()) {
                if (arg instanceof String && ((String) arg).length() < 100) {
                    try {
                        String repoName = "siteSettingRepository";
                        Object repo = applicationContext.getBean(repoName);
                        java.lang.reflect.Method findByKey = repo.getClass().getMethod("findBySettingKey", String.class);
                        Optional<?> result = (Optional<?>) findByKey.invoke(repo, (String) arg);
                        if (result.isPresent()) {
                            Object setting = result.get();
                            java.util.Map<String, Object> fields = new java.util.LinkedHashMap<>();
                            for (java.lang.reflect.Method m : setting.getClass().getMethods()) {
                                String mn = m.getName();
                                if (mn.startsWith("get") && m.getParameterCount() == 0 && !mn.equals("getClass")) {
                                    String fn = Character.toLowerCase(mn.charAt(3)) + mn.substring(4);
                                    if (fn.equals("hibernateLazyInitializer") || fn.equals("handler")) continue;
                                    try {
                                        Object v = m.invoke(setting);
                                        if (v != null && !(v instanceof java.util.Collection) && !v.getClass().getName().contains("$")) {
                                            fields.put(fn, v);
                                        }
                                    } catch (Exception ignored) {}
                                }
                            }
                            // 统一 key 命名为 key/value 以匹配新数据
                            if (fields.containsKey("settingKey")) { fields.put("key", fields.remove("settingKey")); }
                            if (fields.containsKey("settingValue")) { fields.put("value", fields.remove("settingValue")); }
                            fields.remove("id");
                            if (!fields.isEmpty()) {
                                oldDataJson = objectMapper.writeValueAsString(fields);
                                logger.info("[SITE_SETTING_LOG] old data captured: " + oldDataJson);
                            }
                        }
                    } catch (Exception e) { logger.info("[SITE_SETTING_LOG] error: " + e.getMessage()); }
                    break;
                }
            }
        }
        
            if (entityId != null) oldDataJson = loadOldEntityJson(className, entityId);
        }

        Object proceed;
        String result = "SUCCESS";
        String errorMsg = null;
        try {
            proceed = joinPoint.proceed();
            // 登录操作：检查响应体判断成功/失败
            if ("LOGIN".equals(action) && proceed instanceof org.springframework.http.ResponseEntity) {
                org.springframework.http.ResponseEntity<?> resp = (org.springframework.http.ResponseEntity<?>) proceed;
                if (resp.getStatusCode().isError()) {
                    result = "FAIL";
                    Object body = resp.getBody();
                    if (body instanceof Map) errorMsg = (String) ((Map<?,?>) body).get("message");
                }
            }
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
                String entityDisplayName = ENTITY_NAME_MAP.getOrDefault(className, className);
                String actionDisplayName = ACTION_NAME_MAP.getOrDefault(action, action);
                String details = actionDisplayName + entityDisplayName + " " + path;

                // 构建含新旧数据的数据字段
                String newDataJson = captureArgsAsJson(joinPoint);
                // 上传操作：从 MultipartFile 提取文件名
                if ("UPLOAD".equals(action) && newDataJson == null) {
                    for (Object arg : joinPoint.getArgs()) {
                        if (arg instanceof org.springframework.web.multipart.MultipartFile) {
                            String origName = ((org.springframework.web.multipart.MultipartFile) arg).getOriginalFilename();
                            if (origName != null) {
                                newDataJson = "{\"originalName\":\"" + origName.replace("\"", "\\\"") + "\"}";
                            }
                            break;
                        }
                    }
                }
                // SiteSetting 特殊处理：从路径参数提取 key 注入数据
                if ("SiteSetting".equals(className) && newDataJson != null) {
                    for (Object arg : joinPoint.getArgs()) {
                        if (arg instanceof String && ((String) arg).length() < 100) {
                            try {
                                Map<String, Object> siteData = new java.util.HashMap<>();
                                siteData.put("key", arg);
                                Map<String, Object> bodyMap = objectMapper.readValue(newDataJson, Map.class);
                                siteData.putAll(bodyMap);
                                newDataJson = objectMapper.writeValueAsString(siteData);
                            } catch (Exception ignored) {}
                            break;
                        }
                    }
                }
                String dataStr = buildDataString(action, oldDataJson, newDataJson);
                logger.info("[LOG_ASPECT] action=" + action + " oldData=" + (oldDataJson != null ? "present(" + oldDataJson.length() + ")" : "null") + " newData=" + (newDataJson != null ? "present(" + newDataJson.length() + ")" : "null") + " dataStr=" + (dataStr != null ? "present(" + dataStr.length() + ")" : "null"));
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

                // UPDATE 无实际变更时 dataStr 为 null，跳过日志记录
                if (!"UPDATE".equals(action) || dataStr != null) {
                    final OperationLog log = new OperationLog(username, role, action, className, entityId, details, path, result, errorMsg, clientIp);
                    logService.save(log);
                }
            } catch (Exception logEx) { System.err.println("[LOG_ERROR] " + logEx.getMessage()); logEx.printStackTrace(); }
        }
        return proceed;
    }

    /** 构建含新旧数据对比的 JSON 字符串 */
    private String buildDataString(String action, String oldDataJson, String newDataJson) {
        try {
            if ("UPDATE".equals(action) && newDataJson != null) {
                // 比较新旧数据，无实际变更则返回 null（跳过日志记录）
                Map<String, Object> newMap = objectMapper.readValue(newDataJson, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
                if (oldDataJson != null) {
                    Map<String, Object> oldMap = objectMapper.readValue(oldDataJson, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
                    // 移除忽略字段后比较，若无差异则不记录日志
                    Map<String, Object> oldFiltered = new HashMap<>(oldMap);
                    Map<String, Object> newFiltered = new HashMap<>(newMap);
                    // 标准化 tagIds 排序，避免顺序不同导致误判变更
                    normalizeTagIdsOrder(oldFiltered);
                    normalizeTagIdsOrder(newFiltered);
                    // 移除新数据中不存在的 key（未在请求中发送，不算变更）
                    oldFiltered.keySet().retainAll(newFiltered.keySet());
                    String[] ignoredFields = {"id", "createdAt", "updatedAt", "slug", "password", "viewCount", "key"};
                    for (String f : ignoredFields) { oldFiltered.remove(f); newFiltered.remove(f); }
                    if (oldFiltered.equals(newFiltered)) return null;
                }
                // {o: {old data}, n: {new data}}，旧数据可能为 null（如 SiteSetting 按 key 更新无 entityId）
                Map<String, Object> wrapper = new HashMap<>();
                if (oldDataJson != null) wrapper.put("o", objectMapper.readValue(oldDataJson, Object.class));
                wrapper.put("n", newMap);
                String result = objectMapper.writeValueAsString(wrapper);
                return result.length() > 30000 ? result.substring(0, 30000) + "..." : result;
            } else if (newDataJson != null && !newDataJson.isEmpty()) {
                return newDataJson.length() > 30000 ? newDataJson.substring(0, 30000) + "..." : newDataJson;
            } else if (("DELETE".equals(action) || "APPROVE".equals(action) || "REJECT".equals(action)) && oldDataJson != null && !oldDataJson.isEmpty()) {
                // 删除操作保留旧数据，供前端显示名称/标题
                return oldDataJson.length() > 30000 ? oldDataJson.substring(0, 30000) + "..." : oldDataJson;
            }
        } catch (Exception ignored) {}
        return null;
    }

    /** 标准化 tagIds 排序，避免顺序不同导致误判变更 */
    @SuppressWarnings("unchecked")
    private void normalizeTagIdsOrder(Map<String, Object> data) {
        Object tagIds = data.get("tagIds");
        if (tagIds instanceof java.util.List) {
            ((java.util.List<Object>) tagIds).sort((a, b) -> {
                if (a instanceof Number && b instanceof Number) return Long.compare(((Number) a).longValue(), ((Number) b).longValue());
                return String.valueOf(a).compareTo(String.valueOf(b));
            });
        }
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
                if (json != null && !json.equals("{}")) { json = sanitizeSensitiveFields(json); return json; }
            }
        } catch (Exception ignored) {}
        return null;
    }

    
    /** 移除 JSON 中的敏感字段（密码等） */
    private String sanitizeSensitiveFields(String json) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> map = objectMapper.readValue(json, Map.class);
            map.remove("password");
            map.remove("confirmPassword");
            map.remove("oldPassword");
            map.remove("newPassword");
            return objectMapper.writeValueAsString(map);
        } catch (Exception e) {
            return json;
        }
    }

private String loadOldEntityJson(String entityName, Long entityId) {
        try {
            String cleanName = entityName.contains("$") ? entityName.substring(0, entityName.indexOf("$")) : entityName;
            String repoName = cleanName.substring(0, 1).toLowerCase() + cleanName.substring(1) + "Repository";
            logger.info("[LOG_OLD] entityName=" + entityName + " cleanName=" + cleanName + " repoName=" + repoName + " entityId=" + entityId);
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
                            if (val != null && !(val instanceof java.util.Collection) && !val.getClass().getName().contains("$")) {
                                fields.put(field, val);
                            }
                        } catch (Exception ignored) {}
                    }
                }
                                // 为 Article 实体捕获分类ID和标签ID（JPA 关系字段被反射循环跳过）
                if ("Article".equals(cleanName)) {
                    try {
                        java.lang.reflect.Method getCategory = entity.getClass().getMethod("getCategory");
                        Object category = getCategory.invoke(entity);
                        if (category != null) {
                            java.lang.reflect.Method getId = category.getClass().getMethod("getId");
                            Object catId = getId.invoke(category);
                            if (catId != null) fields.put("categoryId", catId);
                        }
                    } catch (Exception ignored) {}
                    try {
                        java.lang.reflect.Method getTags = entity.getClass().getMethod("getTags");
                        Object tags = getTags.invoke(entity);
                        if (tags instanceof java.util.Collection<?> tagCollection) {
                            java.util.List<Long> tagIds = new java.util.ArrayList<>();
                            for (Object tag : tagCollection) {
                                java.lang.reflect.Method getId = tag.getClass().getMethod("getId");
                                Object tid = getId.invoke(tag);
                                if (tid != null) tagIds.add(((Number) tid).longValue());
                            }
                            fields.put("tagIds", tagIds);
                        }
                    } catch (Exception ignored) {}
                    // 捕获 status 和 visibility（内部枚举类型含 $ 被反射循环跳过）
                    try {
                        java.lang.reflect.Method getStatus = entity.getClass().getMethod("getStatus");
                        Object status = getStatus.invoke(entity);
                        if (status != null) fields.put("status", status.toString());
                    } catch (Exception ignored) {}
                    try {
                        java.lang.reflect.Method getVisibility = entity.getClass().getMethod("getVisibility");
                        Object visibility = getVisibility.invoke(entity);
                        if (visibility != null) fields.put("visibility", visibility.toString());
                    } catch (Exception ignored) {}
                }

                                // 为 Comment 实体捕获 status（内部枚举类型含 $ 被反射循环跳过）
                if ("Comment".equals(cleanName)) {
                    try {
                        java.lang.reflect.Method getStatus = entity.getClass().getMethod("getStatus");
                        Object status = getStatus.invoke(entity);
                        if (status != null) fields.put("status", status.toString());
                    } catch (Exception ignored) {}
                }

                if (!fields.isEmpty()) {
                    String json = objectMapper.writeValueAsString(fields);
                    logger.info("[LOG_OLD] captured " + fields.size() + " fields: " + (json.length() > 200 ? json.substring(0, 200) + "..." : json));
                    return json;
                }
                logger.info("[LOG_OLD] fields empty for " + cleanName);
            } else {
                logger.info("[LOG_OLD] entity not found for " + cleanName + " id=" + entityId);
            }
        } catch (Exception e) {
            logger.info("[LOG_OLD] error: " + e.getMessage());
        }
        return null;
    }

}
