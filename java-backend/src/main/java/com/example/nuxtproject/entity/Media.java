package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "media")
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "媒体 ID")
    private Long id;

    @Schema(description = "存储文件名")
    @Column(nullable = false, length = 200)
    private String filename;

    @Schema(description = "原始文件名")
    @Column(nullable = false, length = 200)
    private String originalName;

    @Schema(description = "MIME 类型")
    @Column(nullable = false, length = 100)
    private String mimeType;

    @Schema(description = "文件大小（字节）")
    @Column(nullable = false)
    private Long size;

    @Schema(description = "访问 URL")
    @Column(nullable = false, length = 500)
    private String url;

    @Schema(description = "上传者")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;

    @Schema(description = "上传时间")
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Media() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    public String getOriginalName() { return originalName; }
    public void setOriginalName(String originalName) { this.originalName = originalName; }
    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }
    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public User getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(User uploadedBy) { this.uploadedBy = uploadedBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
