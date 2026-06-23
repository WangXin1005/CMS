package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "tags", indexes = {
    @Index(name = "idx_tag_slug", columnList = "slug", unique = true)
})
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "标签 ID")
    private Long id;

    @Schema(description = "标签名称")
    @Column(nullable = false, length = 50)
    private String name;

    @Schema(description = "标签 Slug（URL 唯一标识）")
    @Column(unique = true, nullable = false, length = 100)
    private String slug;

    @Schema(description = "创建时间")
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Tag() {}

    public Tag(String name, String slug) {
        this.name = name;
        this.slug = slug;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
