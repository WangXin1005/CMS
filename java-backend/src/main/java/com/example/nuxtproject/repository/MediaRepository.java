/**
 * 媒体数据访问层 — 文件记录持久化。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findAllByOrderByCreatedAtDesc();
}
