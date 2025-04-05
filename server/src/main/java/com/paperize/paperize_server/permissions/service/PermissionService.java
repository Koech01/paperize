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
     * @param userEmail The email of the user to grant permission to
     * @return The created permission entity
     * @throws IllegalArgumentException if the user does not exist
     */
    PermissionsEntity grantPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType, 
                                    PermissionsEntity.PermissionType permissionType, String userEmail);

    /**
     * Revokes permission from a user for a specific resource.
     * 
     * @param resourceId The ID of the resource
     * @param resourceType The type of resource
     * @param permissionType The type of permission
     * @param userEmail The email of the user to revoke permission from
     * @throws IllegalArgumentException if the user does not exist
     */
    void revokePermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                         PermissionsEntity.PermissionType permissionType, String userEmail);

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
     * @param userEmail The email of the user
     * @return List of permission entities
     * @throws IllegalArgumentException if the user does not exist
     */
    List<PermissionsEntity> getUserPermissions(String userEmail);

    /**
     * Checks if a user has a specific permission on a resource.
     * 
     * @param resourceId The ID of the resource
     * @param resourceType The type of resource
     * @param permissionType The type of permission
     * @param userEmail The email of the user to check
     * @return true if the user has the permission, false otherwise
     * @throws IllegalArgumentException if the user does not exist
     */
    boolean hasPermission(UUID resourceId, PermissionsEntity.ResourceType resourceType,
                         PermissionsEntity.PermissionType permissionType, String userEmail);
} 