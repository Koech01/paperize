package com.paperize.paperize_server.folder.repository;

import com.paperize.paperize_server.folder.FolderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FolderRepository extends JpaRepository<FolderEntity, UUID> {

    @Query(
        "SELECT f FROM FolderEntity f " +
        "WHERE f.parent.id IS NULL " +
        "AND f.userId = :userId " +
        "AND (EXISTS (SELECT p FROM PermissionsEntity p " +
        "WHERE p.resourceId = f.id " +
        "AND p.resourceType = 'FOLDER' " +
        "AND p.permissionType = 'READ') " +
        "OR f.userId = :userId)"
    )
    List<FolderEntity> findRootFolders(UUID userId);

    @Query(
        "SELECT f FROM FolderEntity f " +
        "WHERE f.id = :folderId " +
        "AND (f.userId = :userId " +
        "OR EXISTS (SELECT p FROM PermissionsEntity p " +
        "WHERE p.resourceId = f.id " +
        "AND p.resourceType = 'FOLDER' " +
        "AND p.permissionType = 'READ'))"
    )
    Optional<FolderEntity> findFolderByIdWithPermission(UUID folderId, UUID userId);

    @Query(
        "SELECT f FROM FolderEntity f " +
        "WHERE f.id = :folderId " +
        "AND EXISTS (SELECT 1 FROM FolderEntity f2 WHERE f2.id = :folderId) " +
        "AND (f.userId = :userId " +
        "OR EXISTS (SELECT p FROM PermissionsEntity p " +
        "WHERE p.resourceId = f.id " +
        "AND p.resourceType = 'FOLDER' " +
        "AND p.permissionType = 'WRITE'))"
    )
    Optional<FolderEntity> findFolderByIdWithWritePermission(UUID folderId, UUID userId);

}
