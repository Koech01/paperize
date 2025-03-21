package com.paperize.paperize_server.file.controller;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.CreateFileRequest;
import com.paperize.paperize_server.file.data.FileDto;
import com.paperize.paperize_server.file.service.FileService;
import com.paperize.paperize_server.mapper.EntityDtoMapper;
import com.paperize.paperize_server.permissions.PermissionsEntity;
import com.paperize.paperize_server.permissions.data.GrantPermissionRequest;
import com.paperize.paperize_server.permissions.data.PermissionResponse;
import com.paperize.paperize_server.permissions.data.RevokePermissionRequest;
import com.paperize.paperize_server.permissions.service.PermissionService;
import com.paperize.paperize_server.utils.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileService fileService;
    private final S3Service s3Service;
    private final PermissionService permissionService;

    @GetMapping("/{folderId}")
    public ResponseEntity<Optional<List<FileDto>>> getFolderFiles(@PathVariable String folderId) {
        Optional<List<FileEntity>> folderFiles = fileService.getFolderFiles(UUID.fromString(folderId));

        EntityDtoMapper fileMapper = new EntityDtoMapper(s3Service);
        List<FileDto> fileDtos = folderFiles
                .map(files -> files.stream()
                        .map(fileMapper::toFileDto)
                        .collect(Collectors.toList()))
                .orElse(null);
        return new ResponseEntity<>(Optional.ofNullable(fileDtos), HttpStatus.OK);
    }

    /**
     * Grants permission to a user for a file.
     */
    @PostMapping("/{fileId}/permissions")
    public ResponseEntity<PermissionResponse> grantFilePermission(
            @PathVariable UUID fileId,
            @RequestBody GrantPermissionRequest request) {
        // Ensure the resourceId matches the fileId
        request.setResourceId(fileId);
        request.setResourceType(PermissionsEntity.ResourceType.FILE);
        
        PermissionsEntity permission = permissionService.grantPermission(
                request.getResourceId(),
                request.getResourceType(),
                request.getPermissionType(),
                request.getUserEmail()
        );
        return ResponseEntity.ok(PermissionResponse.fromEntity(permission));
    }

    /**
     * Revokes permission from a user for a file.
     */
    @DeleteMapping("/{fileId}/permissions")
    public ResponseEntity<Void> revokeFilePermission(
            @PathVariable UUID fileId,
            @RequestBody RevokePermissionRequest request) {
        // Ensure the resourceId matches the fileId
        request.setResourceId(fileId);
        request.setResourceType(PermissionsEntity.ResourceType.FILE);
        
        permissionService.revokePermission(
                request.getResourceId(),
                request.getResourceType(),
                request.getPermissionType(),
                request.getUserEmail()
        );
        return ResponseEntity.ok().build();
    }

    /**
     * Gets all permissions for a file.
     */
    @GetMapping("/{fileId}/permissions")
    public ResponseEntity<List<PermissionResponse>> getFilePermissions(@PathVariable UUID fileId) {
        List<PermissionResponse> permissions = permissionService.getResourcePermissions(
                fileId,
                PermissionsEntity.ResourceType.FILE
        ).stream()
                .map(PermissionResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(permissions);
    }
}
