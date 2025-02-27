package com.paperize.paperize_server.folder.repository;

import com.paperize.paperize_server.folder.FolderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FolderRepository extends JpaRepository<FolderEntity, UUID> {
}
