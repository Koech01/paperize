package com.paperize.paperize_server.file.repository;

import com.paperize.paperize_server.file.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, UUID> {

    Optional<List<FileEntity>> findByFolderId(UUID id);

    @Query("SELECT f FROM FileEntity f WHERE f.folder.id = :id")
    Optional<List<FileEntity>> findFolderFiles(@PathVariable("id") UUID id);

    @Query("SELECT f FROM FileEntity f WHERE f.folder.id = :id AND f.type LIKE %:type%")
    Optional<List<FileEntity>> findFolderFilesByType(UUID id, String type);

    /**
     * Retrieves all files in a folder with READ permission check.
     * User must either own the folder or have READ permission on the folder.
     */
    @Query(
        "SELECT f FROM FileEntity f " +
        "WHERE f.folder.id = :folderId " +
        "AND (f.folder.userId = :userId " +
        "OR EXISTS (SELECT p FROM PermissionsEntity p " +
        "WHERE p.resourceId = f.folder.id " +
        "AND p.resourceType = 'FOLDER' " +
        "AND p.permissionType = 'READ'))"
    )
    Optional<List<FileEntity>> findFolderFilesWithPermission(UUID folderId, UUID userId);

    /**
     * Retrieves files of a specific type in a folder with READ permission check.
     * User must either own the folder or have READ permission on the folder.
     */
    @Query(
        "SELECT f FROM FileEntity f " +
        "WHERE f.folder.id = :folderId " +
        "AND f.type LIKE %:type% " +
        "AND (f.folder.userId = :userId " +
        "OR EXISTS (SELECT p FROM PermissionsEntity p " +
        "WHERE p.resourceId = f.folder.id " +
        "AND p.resourceType = 'FOLDER' " +
        "AND p.permissionType = 'READ'))"
    )
    Optional<List<FileEntity>> findFolderFilesByTypeWithPermission(UUID folderId, String type, UUID userId);

    /**
     * Retrieves a specific file with READ permission check.
     * User must either own the file's folder or have READ permission on the folder.
     */
    @Query(
        "SELECT f FROM FileEntity f " +
        "WHERE f.id = :fileId " +
        "AND (f.folder.userId = :userId " +
        "OR EXISTS (SELECT p FROM PermissionsEntity p " +
        "WHERE p.resourceId = f.folder.id " +
        "AND p.resourceType = 'FOLDER' " +
        "AND p.permissionType = 'READ'))"
    )
    Optional<FileEntity> findFileByIdWithPermission(UUID fileId, UUID userId);

    /**
     * Retrieves a specific file with WRITE permission check.
     * User must either own the file's folder or have WRITE permission on the folder.
     */
    @Query(
        "SELECT f FROM FileEntity f " +
        "WHERE f.id = :fileId " +
        "AND (f.folder.userId = :userId " +
        "OR EXISTS (SELECT p FROM PermissionsEntity p " +
        "WHERE p.resourceId = f.folder.id " +
        "AND p.resourceType = 'FOLDER' " +
        "AND p.permissionType = 'WRITE'))"
    )
    Optional<FileEntity> findFileByIdWithWritePermission(UUID fileId, UUID userId);

    @Query("""
        SELECT f FROM FileEntity f
        LEFT JOIN PermissionsEntity p ON p.resourceId = f.id 
            AND p.resourceType = 'FILE'
            AND p.permissionType = 'DELETE'
            AND p.userId = :userId
        WHERE f.id = :fileId
        AND (f.folder.userId = :userId OR p.id IS NOT NULL)
    """)
    Optional<FileEntity> findFileWithDeletePermission(
        @Param("fileId") UUID fileId,
        @Param("userId") UUID userId
    );
}
