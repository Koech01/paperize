package com.paperize.paperize_server.permissions.service;

import com.paperize.paperize_server.permissions.PermissionsEntity;
import java.util.List;
import java.util.UUID;

public interface PermissionService {
    /**
     * Grants permission to a user for a specific resource.
     * 
     * @param resourceId The ID of the resource (folder or file)
     * @param resourceType The type of resource (FOLDER or FILE)
     * @param permissionType The type of permission (READ, WRITE, DELETE)
     * @param userId The ID of the user to grant permission to
     * @return The created permission entity
     */
    PermissionsEntity grantPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType, 
                                    PermissionsEntity.PermissionType permissionType, UUID userId);

    /**
     * Revokes permission from a user for a specific resource.
     * 
     * @param resourceId The ID of the resource
     * @param resourceType The type of resource
     * @param permissionType The type of permission
     * @param userId The ID of the user to revoke permission from
     */
    void revokePermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                         PermissionsEntity.PermissionType permissionType, UUID userId);

    /**
     * Gets all permissions for a specific resource.
     * 
     * @param resourceId The ID of the resource
     * @param resourceType The type of resource
     * @return List of permission entities
     */
    List<PermissionsEntity> getResourcePermissions(UUID resourceId, PermissionsEntity.ResourceType resourceType);

    /**
     * Gets all permissions granted to a specific user.
     * 
     * @param userId The ID of the user
     * @return List of permission entities
     */
    List<PermissionsEntity> getUserPermissions(UUID userId);

    /**
     * Checks if a user has a specific permission on a resource.
     * 
     * @param resourceId The ID of the resource
     * @param resourceType The type of resource
     * @param permissionType The type of permission
     * @param userId The ID of the user to check
     * @return true if the user has the permission, false otherwise
     */
    boolean hasPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                         PermissionsEntity.PermissionType permissionType, UUID userId);
} 