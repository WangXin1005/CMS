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

    /** 获取已发布的公开文章列表 */
    public Page<Article> listPublished(Pageable pageable, Long categoryId, Long tagId) {
        if (categoryId != null) {
            return articleRepository.findByCategoryIdAndStatus(categoryId, ArticleStatus.PUBLISHED, pageable);
        }
        if (tagId != null) {
            return articleRepository.findByTagId(tagId, ArticleStatus.PUBLISHED, pageable);
        }
        return articleRepository.findByStatusOrderByCreatedAtDesc(ArticleStatus.PUBLISHED, pageable);
    }

    /** 公开搜索已发布文章 */
    public Page<Article> searchPublished(String keyword, Pageable pageable) {
        return articleRepository.search(ArticleStatus.PUBLISHED, keyword, pageable);
    }

    /** 通过 Slug 获取已发布文章（公开访问），并增加浏览次数 */
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
    public Page<Article> listAll(Pageable pageable, ArticleStatus status) {
        if (status != null) {
            return articleRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        }
        return articleRepository.findAll(pageable);
    }

    /** 后台管理：通过 ID 获取文章 */
    public Article getById(Long id) {
        return articleRepository.findById(id).orElse(null);
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
                          String coverImage, ArticleStatus status, Long categoryId, Set<Long> tagIds) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article == null) return null;

        if (title != null) article.setTitle(title);
        if (slug != null) article.setSlug(slug);
        if (content != null) article.setContent(content);
        if (summary != null) article.setSummary(summary);
        if (coverImage != null) article.setCoverImage(coverImage);
        if (status != null) article.setStatus(status);

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
