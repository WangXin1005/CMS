/**
 * 文章服务 — 公开列表/搜索/详情 + 管理后台 CRUD + 个人文章管理。
 */
package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Article;
import com.example.nuxtproject.entity.Article.ArticleStatus;
import com.example.nuxtproject.entity.Category;
import com.example.nuxtproject.entity.Tag;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.entity.Role;
import com.example.nuxtproject.repository.ArticleRepository;
import com.example.nuxtproject.repository.CategoryRepository;
import com.example.nuxtproject.repository.TagRepository;
import com.example.nuxtproject.repository.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageImpl;
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

    /** 获取已发布的公开文章列表 */
    public Page<Article> listPublished(Pageable pageable, Long categoryId, Long tagId, Long currentUserId) {
        if (categoryId != null) {
            return articleRepository.findByCategoryIdAndStatusAndVisibility(categoryId, ArticleStatus.PUBLISHED, pageable);
        }
        if (tagId != null) {
            Page<Article> tagResults = articleRepository.findByTagId(tagId, ArticleStatus.PUBLISHED, pageable);
            return tagResults;
        }
        Page<Article> all = articleRepository.findByStatusAndVisibilityOrderByCreatedAtDesc(ArticleStatus.PUBLISHED, pageable);
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

    /** 后台管理：获取所有文章（含草稿） */
        /** 仪表盘近期文章：仅返回已发布且公开的文章 */
    @Transactional(readOnly = true)
    public Page<Article> listRecentForDashboard(Pageable pageable) {
        return articleRepository.findByStatusAndVisibilityOrderByCreatedAtDesc(ArticleStatus.PUBLISHED, pageable);
    }

        /** 按角色层级返回可见文章：当前用户及下级角色的文章 + 上级的 PUBLIC 文章 */
    @Transactional(readOnly = true)
    public Page<Article> listVisibleToUser(Long userId, Role role, Pageable pageable, ArticleStatus status, String keyword, Long categoryId, Long tagId) {
        // GUEST/普通用户：数据库层过滤仅 PUBLIC 文章，避免分页后过滤导致数量不足
        boolean isGuestOrUser = role != null && (role.name().equals("GUEST") || role.name().equals("USER"));
        if (isGuestOrUser) {
            if (tagId != null) {
                return articleRepository.findPublicArticlesByTag(status, keyword, categoryId, tagId, pageable);
            }
            return articleRepository.findPublicArticles(status, keyword, categoryId, pageable);
        }
        // ADMIN/SUPERADMIN：使用 listAll，内部会按角色过滤可见性
        return listAll(pageable, status, keyword, categoryId, tagId, null, userId, role.name());
    }

    public Page<Article> listAll(Pageable pageable, ArticleStatus status, String keyword, Long categoryId, Long tagId, Long authorId, Long currentUserId, String currentUserRole) {
        boolean hasFilters = status != null || (keyword != null && !keyword.isBlank()) || categoryId != null || tagId != null || authorId != null;
        Page<Article> results;
        if (hasFilters) {
            results = articleRepository.searchAllFilters(status, keyword, categoryId, tagId, authorId, pageable);
        } else {
            results = articleRepository.searchAllFilters(null, null, null, null, null, pageable);
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

    /** 获取指定作者的所有文章（含草稿），支持按状态筛选 */
    public Page<Article> listByAuthor(Long authorId, Pageable pageable, ArticleStatus status, String keyword, Long categoryId, Long tagId, Long currentUserId) {
        return articleRepository.searchAllFilters(status, keyword, categoryId, tagId, authorId, pageable);
    }

    /** 后台管理：通过 ID 获取文章 */
    @Transactional(readOnly = true)
    public Article getById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    /** 获取指定文章并校验作者身份*/
    @Transactional(readOnly = true)
    public Article getByAuthor(Long id, Long authorId) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article != null && article.getAuthor() != null && article.getAuthor().getId().equals(authorId)) {
            return article;
        }
        return null;
    }
    /** 检查 Slug 是否已被使用（不分状态） */
    public boolean isSlugTaken(String slug) {
        return articleRepository.findBySlug(slug).isPresent();
    }

    /** 创建文章 */
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
        // 草稿状态强制设为私密
        article.setVisibility(status == ArticleStatus.DRAFT ? Article.ArticleVisibility.PRIVATE : Article.ArticleVisibility.PUBLIC);
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

    /** 更新文章 */
    public Article update(Long id, String title, String slug, String content, String summary,
                          String coverImage, ArticleStatus status, Article.ArticleVisibility visibility, Long categoryId, Set<Long> tagIds) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article == null) return null;

        if (title != null) article.setTitle(title);
        if (slug != null) article.setSlug(slug);
        if (content != null) article.setContent(content);
        if (summary != null) article.setSummary(summary);
        if (coverImage != null) article.setCoverImage(coverImage);
        if (status != null) article.setStatus(status);
        if (visibility != null) article.setVisibility(visibility);
        // 草稿状态强制设为私密
        if (article.getStatus() == ArticleStatus.DRAFT) article.setVisibility(Article.ArticleVisibility.PRIVATE);

        if (categoryId != null) {
            article.setCategory(categoryRepository.findById(categoryId).orElse(null));
        }

        if (tagIds != null) {
            Set<Tag> tags = tagRepository.findAllById(tagIds).stream().collect(java.util.stream.Collectors.toSet());
            article.setTags(tags);
        }

        return articleRepository.save(article);
    }

    /** 删除文章 */
    @Transactional
    public boolean delete(Long id) {
        if (!articleRepository.existsById(id)) return false;
        commentRepository.deleteByArticleId(id);
        articleRepository.deleteById(id);
        return true;
    }

    /** 删除指定文章并校验作者身份*/
    @Transactional
    public boolean deleteByAuthor(Long id, Long authorId) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article == null) return false;
        if (article.getAuthor() == null || !article.getAuthor().getId().equals(authorId)) return false;
        commentRepository.deleteByArticleId(id);
        articleRepository.deleteById(id);
        return true;
    }
    /** 统计各状态文章数 */
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
