/**
 * 操作日志数据访问层 — 按时间倒序分页查询。
 */
package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.OperationLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OperationLogRepository extends JpaRepository<OperationLog, Long> {
    Page<OperationLog> findByOrderByCreatedAtDesc(Pageable pageable);
    Page<OperationLog> findByUsernameOrderByCreatedAtDesc(String username, Pageable pageable);
    Page<OperationLog> findByActionOrderByCreatedAtDesc(String action, Pageable pageable);
    Page<OperationLog> findByEntityOrderByCreatedAtDesc(String entity, Pageable pageable);
    @Query("SELECT l FROM OperationLog l WHERE (:username IS NULL OR l.username = :username) AND (:action IS NULL OR l.action = :action) AND (:entity IS NULL OR l.entity = :entity) ORDER BY l.createdAt DESC")
    Page<OperationLog> findByFilters(@Param("username") String username, @Param("action") String action, @Param("entity") String entity, Pageable pageable);
}