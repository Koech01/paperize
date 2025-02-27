package com.paperize.paperize_server.file.repository;

import com.paperize.paperize_server.file.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, UUID> {
}
