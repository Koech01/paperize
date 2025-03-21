package com.paperize.paperize_server.permissions.data;

import com.paperize.paperize_server.permissions.PermissionsEntity;
import lombok.Data;

import java.util.UUID;

@Data
public class PermissionResponse {
    private UUID id;
    private UUID resourceId;
    private PermissionsEntity.ResourceType resourceType;
    private PermissionsEntity.PermissionType permissionType;
    private UUID userId;

    public static PermissionResponse fromEntity(PermissionsEntity entity) {
        PermissionResponse response = new PermissionResponse();
        response.setId(entity.getId());
        response.setResourceId(entity.getResourceId());
        response.setResourceType(entity.getResourceType());
        response.setPermissionType(entity.getPermissionType());
        response.setUserId(entity.getUserId());
        return response;
    }
} 