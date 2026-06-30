/**
 * 操作日志数据访问层 — 按时间倒序分页查询。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.OperationLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationLogRepository extends JpaRepository<OperationLog, Long> {
    Page<OperationLog> findByOrderByCreatedAtDesc(Pageable pageable);
    Page<OperationLog> findByUsernameOrderByCreatedAtDesc(String username, Pageable pageable);
    Page<OperationLog> findByActionOrderByCreatedAtDesc(String action, Pageable pageable);
    Page<OperationLog> findByEntityOrderByCreatedAtDesc(String entity, Pageable pageable);
}