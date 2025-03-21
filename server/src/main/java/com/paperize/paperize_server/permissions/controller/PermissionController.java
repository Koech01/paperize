package com.paperize.paperize_server.permissions.controller;

import com.paperize.paperize_server.permissions.PermissionsEntity;
import com.paperize.paperize_server.permissions.data.GrantPermissionRequest;
import com.paperize.paperize_server.permissions.data.PermissionResponse;
import com.paperize.paperize_server.permissions.data.RevokePermissionRequest;
import com.paperize.paperize_server.permissions.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
public class PermissionController {

    private final PermissionService permissionService;

    /**
     * Grants permission to a user for a specific resource.
     */
    @PostMapping("/grant")
    public ResponseEntity<PermissionResponse> grantPermission(@RequestBody GrantPermissionRequest request) {
        PermissionsEntity permission = permissionService.grantPermission(
                request.getResourceId(),
                request.getResourceType(),
                request.getPermissionType(),
                request.getUserEmail()
        );
        return ResponseEntity.ok(PermissionResponse.fromEntity(permission));
    }

    /**
     * Revokes permission from a user for a specific resource.
     */
    @DeleteMapping("/revoke")
    public ResponseEntity<Void> revokePermission(@RequestBody RevokePermissionRequest request) {
        permissionService.revokePermission(
                request.getResourceId(),
                request.getResourceType(),
                request.getPermissionType(),
                request.getUserEmail()
        );
        return ResponseEntity.ok().build();
    }

    /**
     * Gets all permissions for a specific resource.
     */
    @GetMapping("/resource/{resourceId}")
    public ResponseEntity<List<PermissionResponse>> getResourcePermissions(
            @PathVariable UUID resourceId,
            @RequestParam PermissionsEntity.ResourceType resourceType) {
        List<PermissionResponse> permissions = permissionService.getResourcePermissions(resourceId, resourceType)
                .stream()
                .map(PermissionResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(permissions);
    }

    /**
     * Gets all permissions for a specific user.
     */
    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<PermissionResponse>> getUserPermissions(@PathVariable String userEmail) {
        List<PermissionResponse> permissions = permissionService.getUserPermissions(userEmail)
                .stream()
                .map(PermissionResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(permissions);
    }

    /**
     * Checks if a user has a specific permission on a resource.
     */
    @GetMapping("/check")
    public ResponseEntity<Boolean> hasPermission(
            @RequestParam UUID resourceId,
            @RequestParam PermissionsEntity.ResourceType resourceType,
            @RequestParam PermissionsEntity.PermissionType permissionType,
            @RequestParam String userEmail) {
        boolean hasPermission = permissionService.hasPermission(
                resourceId,
                resourceType,
                permissionType,
                userEmail
        );
        return ResponseEntity.ok(hasPermission);
    }
} 