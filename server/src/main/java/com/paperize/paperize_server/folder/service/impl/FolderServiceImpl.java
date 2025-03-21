package com.paperize.paperize_server.folder.service.impl;

import com.paperize.paperize_server.auth.SecurityUtils;
import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.repository.FileRepository;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.data.CreateFolderRequest;
import com.paperize.paperize_server.folder.repository.FolderRepository;
import com.paperize.paperize_server.folder.service.FolderService;
import com.paperize.paperize_server.utils.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FolderServiceImpl implements FolderService {

        private final FolderRepository folderRepository;
        private final S3Service s3service;
        private final FileRepository fileRepository;

        @Override
        public List<FolderEntity> getAllFolders() {
            return folderRepository.findAll();
        }

        @Override
        public List<FolderEntity> getRootFolders(UUID userId) {
            List<FolderEntity> rootFolders = folderRepository.findRootFolders(userId);
            log.info("Root folders - {}", rootFolders);
            return rootFolders;
        }

        @Override
        @Transactional
        public FolderEntity createFolder(CreateFolderRequest folder) {
            log.info(String.valueOf(folder));
            FolderEntity buildFolder = FolderEntity.builder()
                    .name(folder.getName())
                    .build();

            // 1. Get userId from authentication
            UUID userId = SecurityUtils.getCurrentUserId();
            buildFolder.setUserId(userId);

            // 2. If folderId, get folder object
            FolderEntity parentFolder = folderRepository.findFolderByIdWithPermission(UUID.fromString(folder.getParentId()), userId)
                    .orElseThrow(() -> new IllegalArgumentException("Parent folder does not exist or you do not have access"));
            buildFolder.setParent(parentFolder);

            // 3. Save folder
            FolderEntity savedFolder = folderRepository.save(buildFolder);
            log.info("Saved folder - {}", savedFolder);

            // 4. If there are files, persist to s3 and get back the keys
            if (folder.getFiles() != null && !folder.getFiles().isEmpty()) {
                folder.getFiles().forEach(file -> {
                    String fileKey = s3service.uploadFile(file, savedFolder.getId());
                    FileEntity fileEntity = FileEntity.builder()
                            .fileName(file.getName())
                            .type(file.getContentType())
                            .key(fileKey)
                            .size(file.getSize())
                            .folder(savedFolder)
                            .build();
                    FileEntity savedFile = fileRepository.save(fileEntity);
                    log.info("Saved file - {}", savedFile);
                });
            }

            return savedFolder;
        }

        @Override
        @Transactional
        public Optional<List<FileEntity>> getFolderFiles(UUID folderId) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return folderRepository.findFolderByIdWithPermission(folderId, userId)
                    .map(folder -> fileRepository.findFolderFiles(folderId))
                    .orElseThrow(() -> new BadCredentialsException("Folder does not exist"));
        }

        @Override
        public Optional<List<FileEntity>> getFolderFilesByType(UUID folderId, String type) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return folderRepository.findFolderByIdWithPermission(folderId, userId)
                    .map(folder -> fileRepository.findFolderFilesByType(folderId, type))
                    .orElseThrow(() -> new BadCredentialsException("Folder does not exist"));
        }

        @Override
        public FolderEntity getFolderById(UUID folderId) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return folderRepository.findFolderByIdWithPermission(folderId, userId)
                    .orElseThrow(() -> new IllegalArgumentException("Folder does not exist"));
        }
    }