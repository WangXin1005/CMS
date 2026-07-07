package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Media;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.MediaRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 文件存储服务 —— 上传文件到本地磁盘，按日期分目录，UUID 重命名
 * 安全校验：MIME 类型 + 文件魔数（magic bytes）
 */
@Service
public class FileStorageService {

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    private final MediaRepository mediaRepository;

    private static final List<String> ALLOWED_TYPES = List.of(
        "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"
    );
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    /** 文件魔数校验规则：MIME 类型 -> 文件头前缀（十六进制） */
    private static final Map<String, String> MAGIC_BYTES = Map.of(
        "image/jpeg", "FFD8FF",
        "image/png", "89504E47",
        "image/gif", "47494638",
        "image/webp", "52494646",
        "image/svg+xml", "3C3F78"  // <?x
    );

    public FileStorageService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException("无法创建上传目录: " + uploadDir);
        }
    }

    /**
     * 校验文件是否为真实的图片类型（验证魔数）
     *
     * @param mimeType 客户端声明的 MIME 类型
     * @param fileBytes 文件前几个字节用于魔数匹配
     * @return true 如果文件类型合法
     */
    private boolean validateMagicBytes(String mimeType, byte[] fileBytes) {
        String expectedPrefix = MAGIC_BYTES.get(mimeType);
        if (expectedPrefix == null) {
            return false;
        }
        // 对于 SVG，仅检查是否以 XML 声明或 <svg 开头
        if ("image/svg+xml".equals(mimeType)) {
            String head = new String(fileBytes, java.nio.charset.StandardCharsets.UTF_8).trim().toLowerCase();
            return head.startsWith("<?xml") || head.startsWith("<svg");
        }
        // 对于其他格式，比对十六进制文件头
        StringBuilder actualHex = new StringBuilder();
        int checkLen = Math.min(fileBytes.length, 4);
        for (int i = 0; i < checkLen; i++) {
            actualHex.append(String.format("%02X", fileBytes[i]));
        }
        return actualHex.toString().startsWith(expectedPrefix);
    }

    /** 存储上传文件，返回 Media 实体 */
    public Map<String, Object> store(MultipartFile file, User uploader) {
        // 校验文件类型（客户端 MIME）
        String mimeType = file.getContentType();
        if (mimeType == null || !ALLOWED_TYPES.contains(mimeType)) {
            return Map.of("message", "不支持的文件类型，仅允许图片文件");
        }

        // 校验文件大小
        if (file.getSize() > MAX_FILE_SIZE) {
            return Map.of("message", "文件大小不能超过 10MB");
        }

        try {
            // 读取文件头字节用于魔数校验
            byte[] fileBytes = file.getBytes();
            if (!validateMagicBytes(mimeType, fileBytes)) {
                return Map.of("message", "文件内容与声明类型不符，疑似伪装文件");
            }

            // 按日期分目录
            String datePath = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
            Path targetDir = Paths.get(uploadDir, datePath);
            Files.createDirectories(targetDir);

            // UUID 重命名文件，保留原始扩展名
            String originalName = file.getOriginalFilename();
            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }
            String storedName = UUID.randomUUID().toString() + extension;

            // 写入磁盘
            Path targetPath = targetDir.resolve(storedName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // 访问 URL
            String url = "/api/media/files/" + datePath.replace("\\", "/") + "/" + storedName;

            // 保存数据库记录
            Media media = new Media();
            media.setFilename(storedName);
            media.setOriginalName(originalName != null ? originalName : "unknown");
            media.setMimeType(mimeType);
            media.setSize(file.getSize());
            media.setUrl(url);
            media.setUploadedBy(uploader);
            mediaRepository.save(media);

            return Map.of(
                "id", media.getId(),
                "url", url,
                "originalName", originalName,
                "size", file.getSize(),
                "mimeType", mimeType
            );
        } catch (IOException e) {
            return Map.of("message", "文件上传失败: " + e.getMessage());
        }
    }

    /** 获取媒体列表 */
    public List<Media> listAll() {
        return mediaRepository.findAllByOrderByCreatedAtDesc();
    }

    /** 删除媒体文件 */
    public boolean delete(Long id) {
        Media media = mediaRepository.findById(id).orElse(null);
        if (media == null) return false;

        try {
            Path filePath = Paths.get(uploadDir, media.getUrl().replace("/api/media/files/", ""));
            Files.deleteIfExists(filePath);
        } catch (IOException ignored) {}

        mediaRepository.delete(media);
        return true;
    }
}