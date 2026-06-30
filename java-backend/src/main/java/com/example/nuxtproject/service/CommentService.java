/**
 * 评论服务 — 公开提交/查询 + 管理后台审核/删除。
 */
package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Article;
import com.example.nuxtproject.entity.Comment;
import com.example.nuxtproject.entity.Comment.CommentStatus;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.ArticleRepository;
import com.example.nuxtproject.repository.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository,
                          ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
    }

    /** 获取某篇文章已审核通过的公开评论 */
    public List<Comment> getApprovedByArticle(Long articleId) {
        return commentRepository.findByArticleIdAndStatusOrderByCreatedAtDesc(articleId, CommentStatus.APPROVED);
    }

    /** 访客提交评论（状态为 PENDING，需审核） */
    public Map<String, String> submit(String content, Long articleId, User author, Long parentId) {
        Article article = articleRepository.findById(articleId).orElse(null);
        if (article == null) {
            return Map.of("message", "文章不存在");
        }

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setArticle(article);
        comment.setAuthor(author);

        if (parentId != null) {
            Comment parent = commentRepository.findById(parentId).orElse(null);
            comment.setParentComment(parent);
        }

        commentRepository.save(comment);
        return Map.of("message", "评论提交成功，等待审核");
    }

    /** 后台：分页获取所有评论 */
    public Page<Comment> listAll(Pageable pageable, CommentStatus status) {
        if (status != null) {
            return commentRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        }
        return commentRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    /** 审核通过评论 */
    @Transactional
    public boolean approve(Long id) {
        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment == null) return false;
        comment.setStatus(CommentStatus.APPROVED);
        commentRepository.save(comment);
        return true;
    }

    /** 驳回评论 */
    @Transactional
    public boolean reject(Long id) {
        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment == null) return false;
        comment.setStatus(CommentStatus.REJECTED);
        commentRepository.save(comment);
        return true;
    }

    /** 删除评论 */
    @Transactional
    public boolean delete(Long id) {
        if (!commentRepository.existsById(id)) return false;
        commentRepository.deleteById(id);
        return true;
    }

    /** 统计各状态评论数 */
    public Map<String, Long> countByStatus() {
        long pending = commentRepository.countByStatus(CommentStatus.PENDING);
        long approved = commentRepository.countByStatus(CommentStatus.APPROVED);
        return Map.of("pending", pending, "approved", approved);
    }
}
