/**
 * 评论实体 — 文章评论，含审核状态（待审/通过/驳回）。
 */
package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "comments", indexes = {
    @Index(name = "idx_comment_article", columnList = "article_id"),
    @Index(name = "idx_comment_status", columnList = "status")
})
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "评论 ID")
    private Long id;

    @Schema(description = "评论内容")
    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Schema(description = "所属文章")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Schema(description = "评论作者")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Schema(description = "父评论（回复时关联）")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parentComment;

    @Schema(description = "评论状态：PENDING / APPROVED / REJECTED")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CommentStatus status = CommentStatus.PENDING;

    @Schema(description = "创建时间")
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum CommentStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    public Comment() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Article getArticle() { return article; }
    public void setArticle(Article article) { this.article = article; }
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public Comment getParentComment() { return parentComment; }
    public void setParentComment(Comment parentComment) { this.parentComment = parentComment; }
    public CommentStatus getStatus() { return status; }
    public void setStatus(CommentStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
