/**
 * 媒体控制器 — 文件上传（SUPERADMIN/ADMIN/USER）+ 管理后台列表/删除。
 */
package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.Media;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.entity.UserPrincipal;
import com.example.nuxtproject.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@RestController
@Tag(name = "媒体管理", description = "文件上传与管理接口")
public class MediaController {

    private final FileStorageService fileStorageService;

    public MediaController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/api/admin/media/upload")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN', 'USER')")
    @Operation(summary = "上传文件", description = "上传图片文件，支持 jpg/png/gif/webp/svg，最大 10MB")
    public ResponseEntity<?> upload(
            @Parameter(description = "上传的文件", required = true) @RequestParam("file") MultipartFile file,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal) {
        User user = new User();
        user.setId(principal.userId());
        Map<String, Object> result = fileStorageService.store(file, user);
        if (result.containsKey("message") && result.get("message") instanceof String msg && msg.contains("失败")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/api/admin/media")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "媒体列表", description = "返回所有已上传的媒体文件")
    public ResponseEntity<List<Media>> listAll() {
        return ResponseEntity.ok(fileStorageService.listAll());
    }

    @DeleteMapping("/api/admin/media/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "删除媒体", description = "删除指定媒体文件和数据库记录")
    public ResponseEntity<?> delete(
            @Parameter(description = "媒体 ID", required = true) @PathVariable Long id) {
        if (fileStorageService.delete(id)) {
            return ResponseEntity.ok(Map.of("message", "删除成功"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "媒体文件不存在"));
    }
}
