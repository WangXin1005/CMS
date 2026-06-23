package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "categories", indexes = {
    @Index(name = "idx_category_slug", columnList = "slug", unique = true)
})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "分类 ID")
    private Long id;

    @Schema(description = "分类名称")
    @Column(nullable = false, length = 50)
    private String name;

    @Schema(description = "分类 Slug（URL 唯一标识）")
    @Column(unique = true, nullable = false, length = 100)
    private String slug;

    @Schema(description = "分类描述")
    @Column(length = 200)
    private String description;

    @Schema(description = "排序权重，越小越靠前")
    @Column(nullable = false)
    private Integer sortOrder = 0;

    @Schema(description = "创建时间")
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Category() {}

    public Category(String name, String slug) {
        this.name = name;
        this.slug = slug;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
