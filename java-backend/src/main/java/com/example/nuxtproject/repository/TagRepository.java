/**
 * 标签数据访问层 — 按 Slug 查找。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findBySlug(String slug);
    List<Tag> findAllByOrderByCreatedAtDesc();
    /** 按排序权重升序，同权重按创建时间倒序 */
    List<Tag> findAllByOrderBySortOrderAscCreatedAtDesc();

    /** 删除标签前清除文章关联 */
    @Modifying
    @Query(value = "DELETE FROM article_tags WHERE tag_id = :tagId", nativeQuery = true)
    void clearArticleAssociations(@Param("tagId") Long tagId);
}
