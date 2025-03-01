package com.paperize.paperize_server.folder.repository;

import com.paperize.paperize_server.folder.FolderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface FolderRepository extends JpaRepository<FolderEntity, UUID> {

    @Query("SELECT f FROM FolderEntity f WHERE f.parent.id IS NULL AND f.userId = :userId")
    List<FolderEntity> findRootFolders(UUID userId);

    @Query("SELECT f FROM FolderEntity f WHERE f.parent.id IS NULL")
    List<FolderEntity> findAllRootFolders();

}
