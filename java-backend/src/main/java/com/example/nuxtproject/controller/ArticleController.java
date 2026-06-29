package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.Article;
import com.example.nuxtproject.entity.Article.ArticleStatus;
import com.example.nuxtproject.entity.UserPrincipal;
import com.example.nuxtproject.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Set;

@RestController
@Tag(name = "文章管理", description = "文章的公开查询与管理接口")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // ===== 公开接口 =====

    @GetMapping("/api/articles")
    @Operation(summary = "获取已发布文章列表", description = "公开接口，分页返回已发布的文章，可按分类或标签筛选")
    public ResponseEntity<Page<Article>> listPublished(
            @Parameter(description = "页码", required = true) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页条数", required = false) @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "分类 ID", required = false) @RequestParam(required = false) Long categoryId,
            @Parameter(description = "标签 ID", required = false) @RequestParam(required = false) Long tagId,
            @Parameter(description = "关键词搜索", required = false) @RequestParam(required = false) String keyword) {
        if (keyword != null && !keyword.isBlank()) {
            return ResponseEntity.ok(articleService.searchPublished(keyword, PageRequest.of(page - 1, size)));
        }
        return ResponseEntity.ok(articleService.listPublished(PageRequest.of(page - 1, size), categoryId, tagId));
    }

    @GetMapping("/api/articles/{slug}")
    @Operation(summary = "获取文章详情", description = "公开接口，通过 Slug 获取已发布文章内容")
    public ResponseEntity<?> getBySlug(
            @Parameter(description = "文章 Slug", required = true) @PathVariable String slug) {
        Article article = articleService.getPublishedBySlug(slug);
        if (article == null) {
            return ResponseEntity.status(404).body(Map.of("message", "文章不存在或未发布"));
        }
        return ResponseEntity.ok(article);
    }

    @GetMapping("/api/articles/stats")
    @Operation(summary = "获取文章统计", description = "公开接口，返回已发布和草稿文章数量")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(articleService.countByStatus());
    }

    @GetMapping("/api/articles/recent")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "获取最近文章", description = "登录用户均可访问，返回最近的文章（含草稿），用于仪表盘展示")
    public ResponseEntity<Page<Article>> listRecent(
            @Parameter(description = "页码", required = true) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页条数", required = false) @RequestParam(defaultValue = "5") int size,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(articleService.listAll(PageRequest.of(page - 1, size), null, null, null, null, null, principal == null ? null : principal.userId(), principal == null ? null : principal.role()));
    }

    // ===== 用户个人接口（USER 角色可用） =====

    @GetMapping("/api/articles/my")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "获取我的文章列表", description = "当前用户自己的文章列表（含草稿），支持按状态筛选")
    public ResponseEntity<Page<Article>> listMyArticles(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "页码", required = true) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页条数", required = false) @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "文章状态：DRAFT / PUBLISHED", required = false) @RequestParam(required = false) ArticleStatus status,
      @Parameter(description = "标题关键词搜索") @RequestParam(required = false) String keyword,
      @Parameter(description = "分类 ID") @RequestParam(required = false) Long categoryId,
      @Parameter(description = "标签 ID") @RequestParam(required = false) Long tagId) {
        return ResponseEntity.ok(articleService.listByAuthor(principal.userId(), PageRequest.of(page - 1, size), status, keyword, categoryId, tagId));
    }

    @GetMapping("/api/articles/my/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "获取我的文章详情", description = "获取当前用户自己的文章详情（含草稿）")
    public ResponseEntity<?> getMyArticleById(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "文章 ID", required = true) @PathVariable Long id) {
        Article article = articleService.getByAuthor(id, principal.userId());
        if (article == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "文章不存在或无权访问"));
        }
        return ResponseEntity.ok(article);
    }
    @PostMapping("/api/articles/my")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "创建我的文章", description = "当前用户创建属于自己的文章")
    public ResponseEntity<?> createMyArticle(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody CreateArticleRequest request) {
        if (articleService.isSlugTaken(request.getSlug())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Slug 已被使用"));
        }
        Article article = articleService.create(
                request.getTitle(), request.getSlug(), request.getContent(),
                request.getSummary(), request.getCoverImage(), request.getStatus(),
                request.getCategoryId(), request.getTagIds(),
                new com.example.nuxtproject.entity.User() {{ setId(principal.userId()); }});
        return ResponseEntity.ok(Map.of("message", "文章创建成功", "id", article.getId()));
    }

    @PutMapping("/api/articles/my/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "更新我的文章", description = "更新当前用户自己的文章")
    public ResponseEntity<?> updateMyArticle(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "文章 ID", required = true) @PathVariable Long id,
            @RequestBody UpdateArticleRequest request) {
        // 检查文章是否存在且属于当前用户
        Article existing = articleService.getByAuthor(id, principal.userId());
        if (existing == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "文章不存在或无权操作"));
        }
        Article updated = articleService.update(id,
                request.getTitle(), request.getSlug(), request.getContent(),
                request.getSummary(), request.getCoverImage(), request.getStatus(),
                request.getCategoryId(), request.getTagIds());
        if (updated == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "文章不存在"));
        }
        return ResponseEntity.ok(Map.of("message", "文章更新成功"));
    }

    @DeleteMapping("/api/articles/my/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "删除我的文章", description = "删除当前用户自己的文章")
    public ResponseEntity<?> deleteMyArticle(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "文章 ID", required = true) @PathVariable Long id) {
        if (articleService.deleteByAuthor(id, principal.userId())) {
            return ResponseEntity.ok(Map.of("message", "文章删除成功"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "文章不存在或无权操作"));
    }
    // ===== 管理接口 =====

    @GetMapping("/api/admin/articles")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "管理后台文章列表", description = "返回所有文章（含草稿），支持按状态筛选")
    public ResponseEntity<Page<Article>> listAdmin(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,            @Parameter(description = "页码", required = true) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页条数", required = false) @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "文章状态：DRAFT / PUBLISHED", required = false) @RequestParam(required = false) ArticleStatus status,
      @Parameter(description = "标题关键词搜索") @RequestParam(required = false) String keyword,
      @Parameter(description = "分类 ID") @RequestParam(required = false) Long categoryId,
      @Parameter(description = "标签 ID") @RequestParam(required = false) Long tagId,
      @Parameter(description = "作者 ID") @RequestParam(required = false) Long authorId) {
        return ResponseEntity.ok(articleService.listAll(PageRequest.of(page - 1, size), status, keyword, categoryId, tagId, authorId, principal == null ? null : principal.userId(), principal == null ? null : principal.role()));
    }

    @GetMapping("/api/admin/articles/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "获取文章详情（管理后台）", description = "通过 ID 获取文章，含草稿")
    public ResponseEntity<?> getById(
            @Parameter(description = "文章 ID", required = true) @PathVariable Long id) {
        Article article = articleService.getById(id);
        if (article == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "文章不存在"));
        }
        return ResponseEntity.ok(article);
    }

    @PostMapping("/api/admin/articles")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "创建文章", description = "创建新文章，可指定分类和标签")
    public ResponseEntity<?> create(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody CreateArticleRequest request) {
        if (articleService.isSlugTaken(request.getSlug())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Slug 已被使用"));
        }
        Article article = articleService.create(
                request.getTitle(), request.getSlug(), request.getContent(),
                request.getSummary(), request.getCoverImage(), request.getStatus(),
                request.getCategoryId(), request.getTagIds(),
                new com.example.nuxtproject.entity.User() {{ setId(principal.userId()); }});
        return ResponseEntity.ok(Map.of("message", "文章创建成功", "id", article.getId()));
    }

    @PutMapping("/api/admin/articles/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "更新文章", description = "更新文章信息、内容和分类标签")
    public ResponseEntity<?> update(
            @Parameter(description = "文章 ID", required = true) @PathVariable Long id,
            @RequestBody UpdateArticleRequest request) {
        Article updated = articleService.update(id,
                request.getTitle(), request.getSlug(), request.getContent(),
                request.getSummary(), request.getCoverImage(), request.getStatus(),
                request.getCategoryId(), request.getTagIds());
        if (updated == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "文章不存在"));
        }
        return ResponseEntity.ok(Map.of("message", "文章更新成功"));
    }

    @DeleteMapping("/api/admin/articles/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "删除文章", description = "删除指定文章")
    public ResponseEntity<?> delete(
            @Parameter(description = "文章 ID", required = true) @PathVariable Long id) {
        if (articleService.delete(id)) {
            return ResponseEntity.ok(Map.of("message", "文章删除成功"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "文章不存在"));
    }

    // ===== 请求体 DTO =====

    public static class CreateArticleRequest {
        @Schema(description = "文章标题", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "标题不能为空")
        @Size(max = 200, message = "标题长度不能超过200")
        private String title;

        @Schema(description = "文章 Slug（URL 唯一标识）", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "Slug 不能为空")
        @Size(max = 200, message = "Slug 长度不能超过200")
        private String slug;

        @Schema(description = "文章内容（Markdown）", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String content;

        @Schema(description = "文章摘要", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String summary;

        @Schema(description = "封面图片 URL", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String coverImage;

        @Schema(description = "文章状态：DRAFT / PUBLISHED", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private ArticleStatus status;

        @Schema(description = "可见性：PUBLIC / PRIVATE", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Article.ArticleVisibility visibility;

        @Schema(description = "可见性：PUBLIC / PRIVATE", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Article.ArticleVisibility visibility;

        @Schema(description = "分类 ID", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Long categoryId;

        @Schema(description = "标签 ID 集合", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Set<Long> tagIds;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public Article.ArticleVisibility getVisibility() { return visibility; }
        public void setVisibility(Article.ArticleVisibility visibility) { this.visibility = visibility; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public String getSummary() { return summary; }
        public void setSummary(String summary) { this.summary = summary; }
        public String getCoverImage() { return coverImage; }
        public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
        public ArticleStatus getStatus() { return status; }
        public void setStatus(ArticleStatus status) { this.status = status; }
        public Article.ArticleVisibility getVisibility() { return visibility; }
        public void setVisibility(Article.ArticleVisibility visibility) { this.visibility = visibility; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public Set<Long> getTagIds() { return tagIds; }
        public void setTagIds(Set<Long> tagIds) { this.tagIds = tagIds; }
}

    public static class UpdateArticleRequest {
        @Schema(description = "文章标题", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String title;

        @Schema(description = "文章 Slug（URL 唯一标识）", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String slug;

        @Schema(description = "文章内容（Markdown）", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String content;

        @Schema(description = "文章摘要", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String summary;

        @Schema(description = "封面图片 URL", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String coverImage;

        @Schema(description = "文章状态：DRAFT / PUBLISHED", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private ArticleStatus status;

        @Schema(description = "分类 ID", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Long categoryId;

        @Schema(description = "标签 ID 集合", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Set<Long> tagIds;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public String getSummary() { return summary; }
        public void setSummary(String summary) { this.summary = summary; }
        public String getCoverImage() { return coverImage; }
        public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
        public ArticleStatus getStatus() { return status; }
        public void setStatus(ArticleStatus status) { this.status = status; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public Set<Long> getTagIds() { return tagIds; }
        public void setTagIds(Set<Long> tagIds) { this.tagIds = tagIds; }
}
}
