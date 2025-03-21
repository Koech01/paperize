package com.paperize.paperize_server.file.service.impl;

import com.paperize.paperize_server.auth.SecurityUtils;
import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.CreateFileRequest;
import com.paperize.paperize_server.file.repository.FileRepository;
import com.paperize.paperize_server.file.service.FileService;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.repository.FolderRepository;
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
public class FileServiceImpl implements FileService {

    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;
    private final S3Service s3Service;

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
        return fileRepository.findFolderFilesWithPermission(folderId, userId)
                .orElseThrow(() -> {
                    if (!folderRepository.existsById(folderId)) {
                        return new IllegalArgumentException("Folder does not exist");
                    }
                    return new BadCredentialsException("You do not have access to the folder");
                });
    }

    /**
     * Saves multiple files to a folder.
     * 
     * Permission checks:
     * - User must have WRITE permission on the folder
     * - Returns appropriate error if folder doesn't exist or user lacks permission
     * 
     * File handling:
     * - Files are uploaded to S3
     * - File metadata is saved to the database
     * - Files are associated with the specified folder
     */
    @Override
    @Transactional
    public UUID saveFiles(CreateFileRequest body) {
        UUID userId = SecurityUtils.getCurrentUserId();
        UUID folderId = UUID.fromString(body.getFolderId());

        // Check if folder exists and user has WRITE permission
        FolderEntity folder = folderRepository.findFolderByIdWithWritePermission(folderId, userId)
                .orElseThrow(() -> {
                    if (!folderRepository.existsById(folderId)) {
                        return new IllegalArgumentException("Folder does not exist");
                    }
                    return new BadCredentialsException("You do not have access to the folder");
                });

        // Upload files to S3 and save metadata
        body.getFiles().forEach(file -> {
            String fileKey = s3Service.uploadFile(file, folder.getId());
            log.info("Uploaded file to S3 with key: {}", fileKey);

            FileEntity fileEntity = FileEntity.builder()
                    .fileName(file.getOriginalFilename())
                    .size(file.getSize())
                    .folder(folder)
                    .key(fileKey)
                    .type(file.getContentType())
                    .build();

            FileEntity savedFile = fileRepository.save(fileEntity);
            log.info("Saved file metadata: {}", savedFile);
        });

        return folder.getId();
    }
}
