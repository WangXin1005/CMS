package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Category;
import com.example.nuxtproject.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> listAll() {
        return categoryRepository.findAllByOrderBySortOrder();
    }

    public Category getById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category getBySlug(String slug) {
        return categoryRepository.findBySlug(slug).orElse(null);
    }

    public Category create(String name, String slug, String description, Integer sortOrder) {
        if (categoryRepository.findBySlug(slug).isPresent()) {
            return null;
        }
        Category category = new Category(name, slug);
        if (description != null) category.setDescription(description);
        if (sortOrder != null) category.setSortOrder(sortOrder);
        return categoryRepository.save(category);
    }

    public Category update(Long id, String name, String slug, String description, Integer sortOrder) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category == null) return null;

        if (name != null) category.setName(name);
        if (slug != null) category.setSlug(slug);
        if (description != null) category.setDescription(description);
        if (sortOrder != null) category.setSortOrder(sortOrder);
        return categoryRepository.save(category);
    }

    public void reorder(java.util.List<java.util.Map<String, Object>> orders) {
        for (java.util.Map<String, Object> item : orders) {
            Long id = ((Number) item.get("id")).longValue();
            Integer sortOrder = (Integer) item.get("sortOrder");
            categoryRepository.findById(id).ifPresent(cat -> {
                cat.setSortOrder(sortOrder);
                categoryRepository.save(cat);
            });
        }
    }

    public boolean delete(Long id) {
        if (!categoryRepository.existsById(id)) return false;
        categoryRepository.deleteById(id);
        return true;
    }
}
