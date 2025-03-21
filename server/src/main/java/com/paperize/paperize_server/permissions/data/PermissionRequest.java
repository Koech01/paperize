package com.paperize.paperize_server.permissions.data;

import com.paperize.paperize_server.permissions.PermissionsEntity;
import lombok.Data;

import java.util.UUID;

@Data
public class PermissionRequest {
    private UUID resourceId;
    private PermissionsEntity.ResourceType resourceType;
    private PermissionsEntity.PermissionType permissionType;
    private String userEmail;
}
