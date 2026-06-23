package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.Category;
import com.example.nuxtproject.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@Tag(name = "分类管理", description = "文章分类的公开查询与管理接口")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/api/categories")
    @Operation(summary = "获取所有分类", description = "公开接口，返回按排序权重排列的分类列表")
    public ResponseEntity<List<Category>> listAll() {
        return ResponseEntity.ok(categoryService.listAll());
    }

    @GetMapping("/api/categories/{slug}")
    @Operation(summary = "获取分类详情", description = "公开接口，通过 Slug 获取分类信息")
    public ResponseEntity<?> getBySlug(
            @Parameter(description = "分类 Slug", required = true) @PathVariable String slug) {
        Category category = categoryService.getBySlug(slug);
        if (category == null) {
            return ResponseEntity.status(404).body(Map.of("message", "分类不存在"));
        }
        return ResponseEntity.ok(category);
    }

    @PostMapping("/api/admin/categories")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "创建分类", description = "创建新的文章分类")
    public ResponseEntity<?> create(@RequestBody @Valid CreateCategoryRequest request) {
        Category category = categoryService.create(request.getName(), request.getSlug(),
                request.getDescription(), request.getSortOrder());
        if (category == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Slug 已被使用"));
        }
        return ResponseEntity.ok(Map.of("message", "分类创建成功", "id", category.getId()));
    }

    @PutMapping("/api/admin/categories/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "更新分类", description = "更新分类信息")
    public ResponseEntity<?> update(
            @Parameter(description = "分类 ID", required = true) @PathVariable Long id,
            @RequestBody @Valid CreateCategoryRequest request) {
        Category updated = categoryService.update(id, request.getName(), request.getSlug(),
                request.getDescription(), request.getSortOrder());
        if (updated == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "分类不存在"));
        }
        return ResponseEntity.ok(Map.of("message", "分类更新成功"));
    }

    @DeleteMapping("/api/admin/categories/{id}")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @Operation(summary = "删除分类", description = "仅超级管理员可删除分类")
    public ResponseEntity<?> delete(
            @Parameter(description = "分类 ID", required = true) @PathVariable Long id) {
        if (categoryService.delete(id)) {
            return ResponseEntity.ok(Map.of("message", "分类删除成功"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "分类不存在"));
    }

    public static class CreateCategoryRequest {
        @Schema(description = "分类名称", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "分类名称不能为空")
        @Size(max = 50, message = "分类名称长度不能超过50")
        private String name;

        @Schema(description = "分类 Slug（URL 唯一标识）", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "Slug 不能为空")
        @Size(max = 100, message = "Slug 长度不能超过100")
        private String slug;

        @Schema(description = "分类描述", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String description;

        @Schema(description = "排序权重，越小越靠前", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Integer sortOrder;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Integer getSortOrder() { return sortOrder; }
        public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    }
}
