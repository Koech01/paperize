package com.paperize.paperize_server.permissions.service.impl;

import com.paperize.paperize_server.auth.SecurityUtils;
import com.paperize.paperize_server.permissions.PermissionsEntity;
import com.paperize.paperize_server.permissions.repository.PermissionRepository;
import com.paperize.paperize_server.permissions.service.PermissionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;

    /**
     * Grants permission to a user for a specific resource.
     * The current user must own the resource to grant permissions.
     */
    @Override
    @Transactional
    public PermissionsEntity grantPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                                           PermissionsEntity.PermissionType permissionType, UUID userId) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Check if current user owns the resource
        if (!isResourceOwner(resourceId, resourceType, currentUserId)) {
            throw new BadCredentialsException("You can only grant permissions on resources you own");
        }

        // Check if permission already exists
        if (permissionRepository.existsByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
                resourceId, resourceType, permissionType, userId)) {
            throw new IllegalArgumentException("Permission already exists");
        }

        PermissionsEntity permission = PermissionsEntity.builder()
                .resourceId(resourceId)
                .resourceType(resourceType)
                .permissionType(permissionType)
                .userId(userId)
                .build();

        log.info("Granting {} permission on {} {} to user {}", permissionType, resourceType, resourceId, userId);
        return permissionRepository.save(permission);
    }

    /**
     * Revokes permission from a user for a specific resource.
     * The current user must own the resource to revoke permissions.
     */
    @Override
    @Transactional
    public void revokePermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                               PermissionsEntity.PermissionType permissionType, UUID userId) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Check if current user owns the resource
        if (!isResourceOwner(resourceId, resourceType, currentUserId)) {
            throw new BadCredentialsException("You can only revoke permissions on resources you own");
        }

        permissionRepository.deleteByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
                resourceId, resourceType, permissionType, userId);
        log.info("Revoked {} permission on {} {} from user {}", permissionType, resourceType, resourceId, userId);
    }

    /**
     * Gets all permissions for a specific resource.
     * The current user must own the resource to view its permissions.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PermissionsEntity> getResourcePermissions(UUID resourceId, PermissionsEntity.ResourceType resourceType) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Check if current user owns the resource
        if (!isResourceOwner(resourceId, resourceType, currentUserId)) {
            throw new BadCredentialsException("You can only view permissions on resources you own");
        }

        return permissionRepository.findByResourceIdAndResourceType(resourceId, resourceType);
    }

    /**
     * Gets all permissions granted to a specific user.
     * Users can only view their own permissions.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PermissionsEntity> getUserPermissions(UUID userId) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Users can only view their own permissions
        if (!currentUserId.equals(userId)) {
            throw new BadCredentialsException("You can only view your own permissions");
        }

        return permissionRepository.findByUserId(userId);
    }

    /**
     * Checks if a user has a specific permission on a resource.
     */
    @Override
    @Transactional(readOnly = true)
    public boolean hasPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                               PermissionsEntity.PermissionType permissionType, UUID userId) {
        return permissionRepository.existsByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
                resourceId, resourceType, permissionType, userId);
    }

    /**
     * Helper method to check if a user owns a resource.
     * This should be implemented based on your resource ownership logic.
     */
    private boolean isResourceOwner(UUID resourceId, PermissionsEntity.ResourceType resourceType, UUID userId) {
        // TODO: Implement this based on your resource ownership logic
        // This should check if the user owns the folder or file
        return true;
    }
} 