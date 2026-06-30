/**
 * 操作日志服务 — 日志持久化与分页查询。
 */
package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.OperationLog;
import com.example.nuxtproject.repository.OperationLogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class OperationLogService {

    private final OperationLogRepository repository;

    public OperationLogService(OperationLogRepository repository) {
        this.repository = repository;
    }

    public void save(OperationLog log) {
        repository.save(log);
    }

    public Page<OperationLog> list(int page, int size, String username, String action, String entity) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        if (username != null && !username.isEmpty()) {
            return repository.findByUsernameOrderByCreatedAtDesc(username, pageable);
        }
        if (action != null && !action.isEmpty()) {
            return repository.findByActionOrderByCreatedAtDesc(action, pageable);
        }
        if (entity != null && !entity.isEmpty()) {
            return repository.findByEntityOrderByCreatedAtDesc(entity, pageable);
        }
        return repository.findByOrderByCreatedAtDesc(pageable);
    }
}