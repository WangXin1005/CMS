/**
 * 评论控制器 — 公开提交/查询 + 管理后台审核（ADMIN/SUPERADMIN）。
 */
package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.Comment;
import com.example.nuxtproject.entity.Comment.CommentStatus;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.entity.UserPrincipal;
import com.example.nuxtproject.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@Tag(name = "评论管理", description = "文章评论的公开提交与管理接口")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // ===== 公开接口 =====

    @GetMapping("/api/comments/article/{articleId}")
    @Operation(summary = "获取文章评论", description = "公开接口，返回指定文章已审核通过的评论列表")
    public ResponseEntity<List<Comment>> getArticleComments(
            @Parameter(description = "文章 ID", required = true) @PathVariable Long articleId) {
        return ResponseEntity.ok(commentService.getApprovedByArticle(articleId));
    }

    @PostMapping("/api/comments")
    @Operation(summary = "提交评论", description = "公开接口，提交评论后进入待审核状态")
    public ResponseEntity<?> submit(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody @Valid SubmitCommentRequest request) {
        User user = new User();
        user.setId(principal.userId());
        Map<String, String> result = commentService.submit(
                request.getContent(), request.getArticleId(), user, request.getParentId());
        if (result.get("message").contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    // ===== 管理接口 =====

    @GetMapping("/api/admin/comments")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "管理后台评论列表", description = "分页返回所有评论，可按状态筛选")
    public ResponseEntity<Page<Comment>> listAdmin(
            @Parameter(description = "页码", required = true) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页条数", required = false) @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "评论状态：PENDING / APPROVED / REJECTED", required = false) @RequestParam(required = false) CommentStatus status) {
        return ResponseEntity.ok(commentService.listAll(PageRequest.of(page - 1, size), status));
    }

    @PutMapping("/api/admin/comments/{id}/approve")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "审核通过评论", description = "将待审核评论标记为已通过")
    public ResponseEntity<?> approve(
            @Parameter(description = "评论 ID", required = true) @PathVariable Long id) {
        if (commentService.approve(id)) {
            return ResponseEntity.ok(Map.of("message", "评论已通过"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "评论不存在"));
    }

    @PutMapping("/api/admin/comments/{id}/reject")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "驳回评论", description = "将待审核评论标记为已驳回")
    public ResponseEntity<?> reject(
            @Parameter(description = "评论 ID", required = true) @PathVariable Long id) {
        if (commentService.reject(id)) {
            return ResponseEntity.ok(Map.of("message", "评论已驳回"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "评论不存在"));
    }

    @DeleteMapping("/api/admin/comments/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "删除评论", description = "删除指定评论")
    public ResponseEntity<?> delete(
            @Parameter(description = "评论 ID", required = true) @PathVariable Long id) {
        if (commentService.delete(id)) {
            return ResponseEntity.ok(Map.of("message", "评论删除成功"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "评论不存在"));
    }

    @GetMapping("/api/admin/comments/stats")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "评论统计", description = "返回待审核和已通过评论数量")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(commentService.countByStatus());
    }

    // ===== 请求体 DTO =====

    public static class SubmitCommentRequest {
        @Schema(description = "评论内容", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "评论内容不能为空")
        private String content;

        @Schema(description = "文章 ID", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "文章 ID 不能为空")
        private Long articleId;

        @Schema(description = "父评论 ID（回复时填写）", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Long parentId;

        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public Long getArticleId() { return articleId; }
        public void setArticleId(Long articleId) { this.articleId = articleId; }
        public Long getParentId() { return parentId; }
        public void setParentId(Long parentId) { this.parentId = parentId; }
    }
}
