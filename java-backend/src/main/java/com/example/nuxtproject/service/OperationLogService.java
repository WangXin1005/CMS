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
        String u = (username != null && !username.isEmpty()) ? username : null;
        String a = (action != null && !action.isEmpty()) ? action : null;
        String e = (entity != null && !entity.isEmpty()) ? entity : null;
        return repository.findByFilters(u, a, e, pageable);
    }
}