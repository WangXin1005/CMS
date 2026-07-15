/**
 * 分类数据访问层 — 按 Slug 查找，按 sortOrder 排序。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    List<Category> findAllByOrderByCreatedAtDesc();
    List<Category> findAllByOrderBySortOrderAscCreatedAtDesc();

    /** 删除分类前解除文章关联（设为 NULL） */
    @Modifying
    @Query(value = "UPDATE articles SET category_id = NULL WHERE category_id = :catId", nativeQuery = true)
    void clearArticleAssociations(@Param("catId") Long catId);
}
