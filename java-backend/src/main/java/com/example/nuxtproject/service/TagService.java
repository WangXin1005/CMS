/**
 * 标签服务 — 公开列表 + 管理后台 CRUD。
 */
package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Tag;
import com.example.nuxtproject.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> listAll() {
        return tagRepository.findAllByOrderBySortOrderAscCreatedAtDesc();
    }

    public Tag getById(Long id) {
        return tagRepository.findById(id).orElse(null);
    }

    public Tag getBySlug(String slug) {
        return tagRepository.findBySlug(slug).orElse(null);
    }

    public Tag create(String name, String slug) {
        if (tagRepository.findBySlug(slug).isPresent()) {
            return null;
        }
        return tagRepository.save(new Tag(name, slug));
    }

    public Tag update(Long id, String name, String slug) {
        Tag tag = tagRepository.findById(id).orElse(null);
        if (tag == null) return null;
        if (name != null) tag.setName(name);
        if (slug != null) tag.setSlug(slug);
        return tagRepository.save(tag);
    }

    public void reorder(java.util.List<java.util.Map<String, Object>> orders) {
        for (java.util.Map<String, Object> item : orders) {
            Long id = ((Number) item.get("id")).longValue();
            Integer sortOrder = (Integer) item.get("sortOrder");
            tagRepository.findById(id).ifPresent(tag -> {
                tag.setSortOrder(sortOrder);
                tagRepository.save(tag);
            });
        }
    }

    @Transactional
    public boolean delete(Long id) {
        if (!tagRepository.existsById(id)) return false;
        tagRepository.clearArticleAssociations(id); // 先清除文章关联
        tagRepository.deleteById(id);
        return true;
    }
}
