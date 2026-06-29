package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "articles", indexes = {
    @Index(name = "idx_article_slug", columnList = "slug", unique = true),
    @Index(name = "idx_article_status", columnList = "status"),
    @Index(name = "idx_article_author", columnList = "author_id")
})
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "文章 ID")
    private Long id;

    @Schema(description = "文章标题")
    @Column(nullable = false, length = 200)
    private String title;

    @Schema(description = "文章内容（Markdown）")
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Schema(description = "文章摘要")
    @Column(columnDefinition = "TEXT")
    private String summary;

    @Schema(description = "封面图片 URL")
    @Column(length = 500)
    private String coverImage;

    @Schema(description = "文章 Slug（URL 唯一标识）")
    @Column(unique = true, nullable = false, length = 200)
    private String slug;

    @Schema(description = "文章状态：DRAFT / PUBLISHED")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ArticleStatus status = ArticleStatus.DRAFT;

    @Schema(description = "可见性：PUBLIC / PRIVATE")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ArticleVisibility visibility = ArticleVisibility.PUBLIC;

    @Schema(description = "浏览次数")
    @Column(nullable = false)
    private Long viewCount = 0L;

    @Schema(description = "作者")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Schema(description = "所属分类")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Schema(description = "标签列表")
    @ManyToMany
    @JoinTable(name = "article_tags",
        joinColumns = @JoinColumn(name = "article_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();

    @Schema(description = "创建时间")
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Schema(description = "更新时间")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum ArticleStatus {
        DRAFT,
        PUBLISHED
    }

    public enum ArticleVisibility {
        PUBLIC,
        PRIVATE
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Article() {}

    public Article(String title, String slug, User author, ArticleStatus status) {
        this.title = title;
        this.slug = slug;
        this.author = author;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public ArticleStatus getStatus() { return status; }
    public void setStatus(ArticleStatus status) { this.status = status; }
    public ArticleVisibility getVisibility() { return visibility; }
    public void setVisibility(ArticleVisibility visibility) { this.visibility = visibility; }
    public Long getViewCount() { return viewCount; }
    public void setViewCount(Long viewCount) { this.viewCount = viewCount; }
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
