package com.paperize.paperize_server.folder.service.impl;

import com.paperize.paperize_server.auth.SecurityUtils;
import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.CreateFileRequest;
import com.paperize.paperize_server.file.repository.FileRepository;
import com.paperize.paperize_server.file.service.FileService;
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
        private final FileService fileService;

        @Override
        public List<FolderEntity> getAllFolders() {
            return folderRepository.findAll();
        }

        /**
         * Retrieves all root folders (folders without a parent) for a specific user.
         * Only returns folders that the user owns or has READ permission for.
         */
        @Override
        public List<FolderEntity> getRootFolders(UUID userId) {
            List<FolderEntity> rootFolders = folderRepository.findRootFolders(userId);
            log.info("Root folders - {}", rootFolders);
            return rootFolders;
        }

        /**
         * Creates a new folder with optional parent folder and files.
         * 
         * Permission checks:
         * - If parent folder is specified, user must have WRITE permission on the parent
         * - If no parent folder, creates a root folder (user must own it)
         * 
         * File handling:
         * - If files are provided, they are uploaded to S3 and their metadata is saved
         * - Files are associated with the newly created folder
         */
        @Override
        @Transactional
        public FolderEntity createFolder(CreateFolderRequest folder) {
            log.info(String.valueOf(folder));
            FolderEntity buildFolder = FolderEntity.builder()
                    .name(folder.getName())
                    .build();
    
            // Get userId from authentication
            UUID userId = SecurityUtils.getCurrentUserId();
            buildFolder.setUserId(userId);
    
            // If parentId is provided, get the parent folder object and check permissions
            if (folder.getParentId() != null) {
                FolderEntity parentFolder = folderRepository.findFolderByIdWithWritePermission(UUID.fromString(folder.getParentId()), userId)
                        .orElseThrow(() -> {
                            // Check if folder exists at all
                            if (!folderRepository.existsById(UUID.fromString(folder.getParentId()))) {
                                return new IllegalArgumentException("Parent folder does not exist");
                            }
                            return new BadCredentialsException("You do not have access to the parent folder");
                        });
                buildFolder.setParent(parentFolder);
            }
    
            // Save the new folder entity to the repository
            FolderEntity savedFolder = folderRepository.save(buildFolder);
            log.info("Saved folder - {}", savedFolder);
    
            // If there are files in the request, upload them to S3 and save their metadata to the repository
            if (folder.getFiles() != null && !folder.getFiles().isEmpty()) {
                CreateFileRequest fileRequest = CreateFileRequest.builder()
                        .folderId(savedFolder.getId().toString())
                        .files(folder.getFiles())
                        .build();
                fileService.saveFiles(fileRequest);
            }

            return savedFolder;
        }

        /**
         * Retrieves all files in a specific folder.
         * 
         * Permission checks:
         * - User must have READ permission on the folder
         * - Returns appropriate error if folder doesn't exist or user lacks permission
         */
        @Override
        @Transactional
        public Optional<List<FileEntity>> getFolderFiles(UUID folderId) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return folderRepository.findFolderByIdWithPermission(folderId, userId)
                    .map(folder -> fileRepository.findFolderFiles(folderId))
                    .orElseThrow(() -> {
                        if (!folderRepository.existsById(folderId)) {
                            return new IllegalArgumentException("Folder does not exist");
                        }
                        return new BadCredentialsException("You do not have access to the folder");
                    });
        }

        /**
         * Retrieves files of a specific type in a folder.
         * 
         * Permission checks:
         * - User must have READ permission on the folder
         * - Returns appropriate error if folder doesn't exist or user lacks permission
         */
        @Override
        @Transactional
        public Optional<List<FileEntity>> getFolderFilesByType(UUID folderId, String type) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return folderRepository.findFolderByIdWithPermission(folderId, userId)
                    .map(folder -> fileRepository.findFolderFilesByType(folderId, type))
                    .orElseThrow(() -> {
                        if (!folderRepository.existsById(folderId)) {
                            return new IllegalArgumentException("Folder does not exist");
                        }
                        return new BadCredentialsException("You do not have access to the folder");
                    });
        }

        /**
         * Retrieves a folder by its ID.
         * 
         * Permission checks:
         * - User must have READ permission on the folder
         * - Returns appropriate error if folder doesn't exist or user lacks permission
         */
        @Override
        @Transactional
        public FolderEntity getFolderById(UUID folderId) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return folderRepository.findFolderByIdWithPermission(folderId, userId)
                    .orElseThrow(() -> {
                        if (!folderRepository.existsById(folderId)) {
                            return new IllegalArgumentException("Folder does not exist");
                        }
                        return new BadCredentialsException("You do not have access to the folder");
                    });
        }

    @Override
    @Transactional
    public void deleteFolder(UUID folderId) {
        // Check if folder exists
        if (!folderRepository.existsById(folderId)) {
            throw new IllegalArgumentException("Folder does not exist");
        }

        // Delete the folder from the repository
        folderRepository.deleteById(folderId);
        log.info("Deleted folder with ID: {}", folderId);
    }
}