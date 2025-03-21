package com.paperize.paperize_server.permissions.service.impl;

import com.paperize.paperize_server.auth.SecurityUtils;
import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.repository.FileRepository;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.repository.FolderRepository;
import com.paperize.paperize_server.permissions.PermissionsEntity;
import com.paperize.paperize_server.permissions.repository.PermissionRepository;
import com.paperize.paperize_server.permissions.service.PermissionService;
import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.service.UserService;
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
    private final UserService userService;
    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;

    /**
     * Grants permission to a user for a specific resource.
     * The current user must own the resource to grant permissions.
     */
    @Override
    @Transactional
    public PermissionsEntity grantPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                                           PermissionsEntity.PermissionType permissionType, String userEmail) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Check if resource exists
        if (!resourceExists(resourceId, resourceType)) {
            throw new IllegalArgumentException(resourceType + " with ID " + resourceId + " does not exist");
        }

        // Check if current user owns the resource
        if (!isResourceOwner(resourceId, resourceType, currentUserId)) {
            throw new BadCredentialsException("You can only grant permissions on resources you own");
        }

        // Get user by email
        UserEntity user = userService.getUserByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User with email " + userEmail + " does not exist");
        }

        // Check if permission already exists
        if (permissionRepository.existsByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
                resourceId, resourceType, permissionType, user.getId())) {
            throw new IllegalArgumentException("Permission already exists");
        }

        PermissionsEntity permission = PermissionsEntity.builder()
                .resourceId(resourceId)
                .resourceType(resourceType)
                .permissionType(permissionType)
                .userId(user.getId())
                .build();

        log.info("Granting {} permission on {} {} to user {}", permissionType, resourceType, resourceId, userEmail);
        return permissionRepository.save(permission);
    }

    /**
     * Revokes permission from a user for a specific resource.
     * The current user must own the resource to revoke permissions.
     */
    @Override
    @Transactional
    public void revokePermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                               PermissionsEntity.PermissionType permissionType, String userEmail) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Check if resource exists
        if (!resourceExists(resourceId, resourceType)) {
            throw new IllegalArgumentException(resourceType + " with ID " + resourceId + " does not exist");
        }

        // Check if current user owns the resource
        if (!isResourceOwner(resourceId, resourceType, currentUserId)) {
            throw new BadCredentialsException("You can only revoke permissions on resources you own");
        }

        // Get user by email
        UserEntity user = userService.getUserByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User with email " + userEmail + " does not exist");
        }

        permissionRepository.deleteByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
                resourceId, resourceType, permissionType, user.getId());
        log.info("Revoked {} permission on {} {} from user {}", permissionType, resourceType, resourceId, userEmail);
    }

    /**
     * Gets all permissions for a specific resource.
     * The current user must own the resource to view its permissions.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PermissionsEntity> getResourcePermissions(UUID resourceId, PermissionsEntity.ResourceType resourceType) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Check if resource exists
        if (!resourceExists(resourceId, resourceType)) {
            throw new IllegalArgumentException(resourceType + " with ID " + resourceId + " does not exist");
        }

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
    public List<PermissionsEntity> getUserPermissions(String userEmail) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        
        // Get user by email
        UserEntity user = userService.getUserByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User with email " + userEmail + " does not exist");
        }
        
        // Users can only view their own permissions
        if (!currentUserId.equals(user.getId())) {
            throw new BadCredentialsException("You can only view your own permissions");
        }

        return permissionRepository.findByUserId(user.getId());
    }

    /**
     * Checks if a user has a specific permission on a resource.
     */
    @Override
    @Transactional(readOnly = true)
    public boolean hasPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                               PermissionsEntity.PermissionType permissionType, String userEmail) {
        // Check if resource exists
        if (!resourceExists(resourceId, resourceType)) {
            throw new IllegalArgumentException(resourceType + " with ID " + resourceId + " does not exist");
        }

        // Get user by email
        UserEntity user = userService.getUserByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User with email " + userEmail + " does not exist");
        }

        return permissionRepository.existsByResourceIdAndResourceTypeAndPermissionTypeAndUserId(
                resourceId, resourceType, permissionType, user.getId());
    }

    /**
     * Helper method to check if a user owns a resource.
     * For folders, checks if the user owns the folder directly.
     * For files, checks if the user owns the folder containing the file.
     */
    private boolean isResourceOwner(UUID resourceId, PermissionsEntity.ResourceType resourceType, UUID userId) {
        return switch (resourceType) {
            case FOLDER -> {
                FolderEntity folder = folderRepository.findById(resourceId)
                        .orElseThrow(() -> new IllegalArgumentException("Folder not found"));
                yield folder.getUserId().equals(userId);
            }
            case FILE -> {
                FileEntity file = fileRepository.findById(resourceId)
                        .orElseThrow(() -> new IllegalArgumentException("File not found"));
                yield file.getFolder().getUserId().equals(userId);
            }
        };
    }

    /**
     * Helper method to check if a resource exists.
     */
    private boolean resourceExists(UUID resourceId, PermissionsEntity.ResourceType resourceType) {
        return switch (resourceType) {
            case FOLDER -> folderRepository.existsById(resourceId);
            case FILE -> fileRepository.existsById(resourceId);
        };
    }
} 