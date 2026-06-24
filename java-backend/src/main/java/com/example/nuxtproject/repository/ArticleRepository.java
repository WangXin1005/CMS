package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Article;
import com.example.nuxtproject.entity.Article.ArticleStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findBySlug(String slug);
    Page<Article> findByStatusOrderByCreatedAtDesc(ArticleStatus status, Pageable pageable);
    Page<Article> findByCategoryIdAndStatus(Long categoryId, ArticleStatus status, Pageable pageable);
    long countByStatus(ArticleStatus status);

    Page<Article> findByAuthorIdOrderByCreatedAtDesc(Long authorId, Pageable pageable);
    Page<Article> findByAuthorIdAndStatusOrderByCreatedAtDesc(Long authorId, ArticleStatus status, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.status = :status AND (:keyword IS NULL OR a.title LIKE %:keyword% OR a.summary LIKE %:keyword%)")
    Page<Article> search(@Param("status") ArticleStatus status, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT a FROM Article a JOIN a.tags t WHERE t.id = :tagId AND a.status = :status")
    Page<Article> findByTagId(@Param("tagId") Long tagId, @Param("status") ArticleStatus status, Pageable pageable);
}