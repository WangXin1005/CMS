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

    @Query("SELECT a FROM Article a WHERE (:status IS NULL OR a.status = :status) AND (:keyword IS NULL OR a.title LIKE %:keyword%) AND (:categoryId IS NULL OR a.category.id = :categoryId) AND (:authorId IS NULL OR a.author.id = :authorId) ORDER BY a.createdAt DESC")
    Page<Article> searchAll(@Param("status") ArticleStatus status, @Param("keyword") String keyword, @Param("categoryId") Long categoryId, @Param("authorId") Long authorId, Pageable pageable);

    @Query("SELECT a FROM Article a JOIN a.tags t WHERE (:status IS NULL OR a.status = :status) AND (:keyword IS NULL OR a.title LIKE %:keyword%) AND (:tagId IS NULL OR t.id = :tagId) AND (:authorId IS NULL OR a.author.id = :authorId) ORDER BY a.createdAt DESC")
    Page<Article> searchAllByTag(@Param("status") ArticleStatus status, @Param("keyword") String keyword, @Param("tagId") Long tagId, @Param("authorId") Long authorId, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.author.id = :authorId AND (:status IS NULL OR a.status = :status) AND (:keyword IS NULL OR a.title LIKE %:keyword%) AND (:categoryId IS NULL OR a.category.id = :categoryId) ORDER BY a.createdAt DESC")
    Page<Article> searchByAuthor(@Param("authorId") Long authorId, @Param("status") ArticleStatus status, @Param("keyword") String keyword, @Param("categoryId") Long categoryId, Pageable pageable);

    @Query("SELECT a FROM Article a JOIN a.tags t WHERE a.author.id = :authorId AND (:status IS NULL OR a.status = :status) AND (:keyword IS NULL OR a.title LIKE %:keyword%) AND (:tagId IS NULL OR t.id = :tagId) ORDER BY a.createdAt DESC")
    Page<Article> searchByAuthorAndTag(@Param("authorId") Long authorId, @Param("status") ArticleStatus status, @Param("keyword") String keyword, @Param("tagId") Long tagId, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.status = :status AND (:keyword IS NULL OR a.title LIKE %:keyword% OR a.summary LIKE %:keyword%)")
    Page<Article> search(@Param("status") ArticleStatus status, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT a FROM Article a JOIN a.tags t WHERE t.id = :tagId AND a.status = :status")
    Page<Article> findByTagId(@Param("tagId") Long tagId, @Param("status") ArticleStatus status, Pageable pageable);

    @Query("SELECT DISTINCT a FROM Article a LEFT JOIN a.tags t WHERE (:status IS NULL OR a.status = :status) AND (:keyword IS NULL OR a.title LIKE %:keyword%) AND (:categoryId IS NULL OR a.category.id = :categoryId) AND (:tagId IS NULL OR t.id = :tagId) AND (:authorId IS NULL OR a.author.id = :authorId) ORDER BY a.createdAt DESC")
    Page<Article> searchAllFilters(@Param("status") ArticleStatus status, @Param("keyword") String keyword, @Param("categoryId") Long categoryId, @Param("tagId") Long tagId, @Param("authorId") Long authorId, Pageable pageable);
}