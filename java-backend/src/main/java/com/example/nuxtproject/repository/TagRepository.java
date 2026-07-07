/**
 * 标签数据访问层 — 按 Slug 查找。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findBySlug(String slug);
    List<Tag> findAllByOrderByCreatedAtDesc();
}
