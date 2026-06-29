package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Article;
import com.example.nuxtproject.entity.Article.ArticleStatus;
import com.example.nuxtproject.entity.Category;
import com.example.nuxtproject.entity.Tag;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.ArticleRepository;
import com.example.nuxtproject.repository.CategoryRepository;
import com.example.nuxtproject.repository.TagRepository;
import com.example.nuxtproject.repository.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.Set;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final CommentRepository commentRepository;

    public ArticleService(ArticleRepository articleRepository,
                          CategoryRepository categoryRepository,
                          TagRepository tagRepository, CommentRepository commentRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.commentRepository = commentRepository;
    }

    /** 鑾峰彇宸插彂甯冪殑鍏紑鏂囩珷鍒楄〃 */
    public Page<Article> listPublished(Pageable pageable, Long categoryId, Long tagId, Long currentUserId) {
        if (categoryId != null) {
            return articleRepository.findByCategoryIdAndStatus(categoryId, ArticleStatus.PUBLISHED, pageable);
        }
        if (tagId != null) {
            Page<Article> tagResults = articleRepository.findByTagId(tagId, ArticleStatus.PUBLISHED, pageable);
            tagResults.getContent().removeIf(a -> a.getVisibility() == Article.ArticleVisibility.PRIVATE);
            return tagResults;
        }
        Page<Article> all = articleRepository.findByStatusOrderByCreatedAtDesc(ArticleStatus.PUBLISHED, pageable);
        // Show only PUBLIC visibility articles in public listing
        all.getContent().removeIf(a -> a.getVisibility() == Article.ArticleVisibility.PRIVATE);
        return all;
    }

    /** 鍏紑鎼滅储宸插彂甯冩枃绔?*/
    public Page<Article> searchPublished(String keyword, Pageable pageable) {
        return articleRepository.search(ArticleStatus.PUBLISHED, keyword, pageable);
    }

    /** 閫氳繃 Slug 鑾峰彇宸插彂甯冩枃绔狅紙鍏紑璁块棶锛夛紝骞跺鍔犳祻瑙堟鏁?*/
    @Transactional
    public Article getPublishedBySlug(String slug) {
        Article article = articleRepository.findBySlug(slug).orElse(null);
        if (article != null && article.getStatus() == ArticleStatus.PUBLISHED) {
            article.setViewCount(article.getViewCount() + 1);
            articleRepository.save(article);
        }
        return article;
    }

    /** 鍚庡彴绠＄悊锛氳幏鍙栨墍鏈夋枃绔狅紙鍚崏绋匡級 */
    public Page<Article> listAll(Pageable pageable, ArticleStatus status, String keyword, Long categoryId, Long tagId, Long authorId, Long currentUserId, String currentUserRole) {
        boolean hasFilters = status != null || (keyword != null && !keyword.isBlank()) || categoryId != null || tagId != null || authorId != null;
        Page<Article> results;
        if (hasFilters) {
            results = articleRepository.searchAllFilters(status, keyword, categoryId, tagId, authorId, pageable);
        } else {
            results = articleRepository.findAll(pageable);
        }
        // Filter PRIVATE articles: only author and admins can see them
        java.util.List<Article> content = new java.util.ArrayList<>(results.getContent());
        // SUPERADMIN/ADMIN 可见所有文章，其他角色只能看自己的 PRIVATE 文章
        boolean isPrivileged = currentUserRole != null && (currentUserRole.equals("SUPERADMIN") || currentUserRole.equals("ADMIN"));
        if (!isPrivileged) {
            content.removeIf(a -> 
                a.getVisibility() == Article.ArticleVisibility.PRIVATE 
                && (a.getAuthor() == null || !a.getAuthor().getId().equals(currentUserId))
            );
        }
        if (content.size() != results.getContent().size()) {
            results = new org.springframework.data.domain.PageImpl<>(content, pageable, results.getTotalElements());
        }
        return results;
    }

    /** 鑾峰彇鎸囧畾浣滆€呯殑鎵€鏈夋枃绔狅紙鍚崏绋匡級锛屾敮鎸佹寜鐘舵€佺瓫閫?*/
    public Page<Article> listByAuthor(Long authorId, Pageable pageable, ArticleStatus status, String keyword, Long categoryId, Long tagId, Long currentUserId) {
        return articleRepository.searchAllFilters(status, keyword, categoryId, tagId, authorId, pageable);
    }

    /** 鍚庡彴绠＄悊锛氶€氳繃 ID 鑾峰彇鏂囩珷 */
    @Transactional(readOnly = true)
    public Article getById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    /** 鑾峰彇鎸囧畾鏂囩珷骞舵牎楠屼綔鑰呰韩浠?*/
    @Transactional(readOnly = true)
    public Article getByAuthor(Long id, Long authorId) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article != null && article.getAuthor() != null && article.getAuthor().getId().equals(authorId)) {
            return article;
        }
        return null;
    }
    /** 妫€鏌?Slug 鏄惁宸茶浣跨敤锛堜笉鍒嗙姸鎬侊級 */
    public boolean isSlugTaken(String slug) {
        return articleRepository.findBySlug(slug).isPresent();
    }

    /** 鍒涘缓鏂囩珷 */
    public Article create(String title, String slug, String content, String summary,
                          String coverImage, ArticleStatus status, Long categoryId,
                          Set<Long> tagIds, User author) {
        Article article = new Article();
        article.setTitle(title);
        article.setSlug(slug);
        article.setContent(content);
        article.setSummary(summary);
        article.setCoverImage(coverImage);
        article.setStatus(status != null ? status : ArticleStatus.DRAFT);
        article.setVisibility(visibility != null ? visibility : Article.ArticleVisibility.PUBLIC);
        article.setAuthor(author);

        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            article.setCategory(category);
        }

        if (tagIds != null && !tagIds.isEmpty()) {
            Set<Tag> tags = tagRepository.findAllById(tagIds).stream().collect(java.util.stream.Collectors.toSet());
            article.setTags(tags);
        }

        return articleRepository.save(article);
    }

    /** 鏇存柊鏂囩珷 */
    public Article update(Long id, String title, String slug, String content, String summary,
                          String coverImage, ArticleStatus status, Long categoryId, Set<Long> tagIds) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article == null) return null;

        if (title != null) article.setTitle(title);
        if (slug != null) article.setSlug(slug);
        if (content != null) article.setContent(content);
        if (summary != null) article.setSummary(summary);
        if (coverImage != null) article.setCoverImage(coverImage);
        if (status != null) article.setStatus(status);
        if (visibility != null) article.setVisibility(visibility);

        if (categoryId != null) {
            article.setCategory(categoryRepository.findById(categoryId).orElse(null));
        }

        if (tagIds != null) {
            Set<Tag> tags = tagRepository.findAllById(tagIds).stream().collect(java.util.stream.Collectors.toSet());
            article.setTags(tags);
        }

        return articleRepository.save(article);
    }

    /** 鍒犻櫎鏂囩珷 */
    @Transactional
    public boolean delete(Long id) {
        if (!articleRepository.existsById(id)) return false;
        articleRepository.deleteById(id);
        return true;
    }

    /** 鍒犻櫎鎸囧畾鏂囩珷骞舵牎楠屼綔鑰呰韩浠?*/
    @Transactional
    public boolean deleteByAuthor(Long id, Long authorId) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article == null) return false;
        if (article.getAuthor() == null || !article.getAuthor().getId().equals(authorId)) return false;
        articleRepository.deleteById(id);
        return true;
    }
    /** 缁熻鍚勭姸鎬佹枃绔犳暟 */
    public Map<String, Long> countByStatus() {
        long published = articleRepository.countByStatus(ArticleStatus.PUBLISHED);
        long draft = articleRepository.countByStatus(ArticleStatus.DRAFT);
        long totalCategories = categoryRepository.count();
        long totalTags = tagRepository.count();
        long totalComments = commentRepository.count();
        return Map.of(
            "totalArticles", published + draft,
            "publishedArticles", published,
            "draftArticles", draft,
            "totalCategories", totalCategories,
            "totalTags", totalTags,
            "totalComments", totalComments
        );
    }
}