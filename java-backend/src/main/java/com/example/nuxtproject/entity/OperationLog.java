/**
 * 操作日志实体 — 记录用户操作的时间、类型、IP、数据变更。
 */
package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "operation_logs", indexes = {
    @Index(name = "idx_log_username", columnList = "username"),
    @Index(name = "idx_log_action", columnList = "action"),
    @Index(name = "idx_log_created", columnList = "createdAt")
})
public class OperationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "操作用户名")
    @Column(length = 100)
    private String username;

    @Schema(description = "用户角色")
    @Column(length = 20)
    private String role;

    @Schema(description = "操作类型：CREATE / UPDATE / DELETE / LOGIN / LOGOUT / OTHER")
    @Column(nullable = false, length = 20)
    private String action;

    @Schema(description = "操作对象类型：Article / Category / Tag / User / Comment / Media / Setting 等")
    @Column(nullable = false, length = 30)
    private String entity;

    @Schema(description = "操作对象ID")
    private Long entityId;

    @Schema(description = "操作详情")
    @Column(columnDefinition = "MEDIUMTEXT")
    private String details;

    @Schema(description = "客户端IP")
    @Column(length = 50)
    private String clientIp;

    @Schema(description = "请求路径")
    @Column(length = 200)
    private String path;

    @Schema(description = "操作结果：SUCCESS / FAIL")
    @Column(nullable = false, length = 10)
    private String result = "SUCCESS";

    @Schema(description = "错误信息")
    @Column(length = 500)
    private String errorMsg;

    @Schema(description = "操作时间")
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public OperationLog() {}

    public OperationLog(String username, String role, String action, String entity, Long entityId, String details, String path, String result, String errorMsg, String clientIp) {
        this.username = username;
        this.role = role;
        this.action = action;
        this.entity = entity;
        this.entityId = entityId;
        this.details = details;
        this.path = path;
        this.result = result;
        this.errorMsg = errorMsg;
        this.clientIp = clientIp;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
    public String getAction() { return action; }
    public String getEntity() { return entity; }
    public Long getEntityId() { return entityId; }
    public String getDetails() { return details; }
    public String getPath() { return path; }
    public String getResult() { return result; }
    public String getClientIp() { return clientIp; }
    public void setClientIp(String clientIp) { this.clientIp = clientIp; }

    public String getErrorMsg() { return errorMsg; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setRole(String role) { this.role = role; }
    public void setAction(String action) { this.action = action; }
    public void setEntity(String entity) { this.entity = entity; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    public void setDetails(String details) { this.details = details; }
    public void setPath(String path) { this.path = path; }
    public void setResult(String result) { this.result = result; }
    public void setErrorMsg(String errorMsg) { this.errorMsg = errorMsg; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}