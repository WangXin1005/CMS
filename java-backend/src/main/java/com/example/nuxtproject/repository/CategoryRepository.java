/**
 * 分类数据访问层 — 按 Slug 查找，按 sortOrder 排序。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    java.util.List<Category> findAllByOrderBySortOrder();
}
