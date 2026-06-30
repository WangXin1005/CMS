/**
 * 评论数据访问层 — 按文章/状态查询，统计各状态数量。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Comment;
import com.example.nuxtproject.entity.Comment.CommentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleIdAndStatusOrderByCreatedAtDesc(Long articleId, CommentStatus status);
    Page<Comment> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Comment> findByStatusOrderByCreatedAtDesc(CommentStatus status, Pageable pageable);
    long countByStatus(CommentStatus status);
    long countByArticleId(Long articleId);
}
