package com.paperize.paperize_server.permissions.repository;

import com.paperize.paperize_server.permissions.PermissionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionsEntity, UUID> {
    
    List<PermissionsEntity> findByResourceIdAndResourceType(UUID resourceId, PermissionsEntity.ResourceType resourceType);
    
    List<PermissionsEntity> findByUserId(UUID userId);
    
    boolean existsByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
            UUID resourceId, PermissionsEntity.ResourceType resourceType,
            PermissionsEntity.PermissionType permissionType, UUID userId);
    
    void deleteByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
            UUID resourceId, PermissionsEntity.ResourceType resourceType,
            PermissionsEntity.PermissionType permissionType, UUID userId);
} 