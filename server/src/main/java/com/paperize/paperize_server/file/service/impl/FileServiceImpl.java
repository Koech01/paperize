package com.paperize.paperize_server.file.service.impl;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.CreateFileRequest;
import com.paperize.paperize_server.file.repository.FileRepository;
import com.paperize.paperize_server.file.service.FileService;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.repository.FolderRepository;
import com.paperize.paperize_server.utils.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;
    private final S3Service s3Service;

    @Override
    public Optional<List<FileEntity>> getFolderFiles(UUID folderId) {
        return fileRepository.findByFolderId(folderId);
    }

    @Override
    @Transactional
    public UUID saveFiles(CreateFileRequest body) {
        FolderEntity folderEntity = folderRepository.findById(UUID.fromString(body.getFolderId()))
                .map(folder -> {
                    body.getFiles().forEach(file -> {
                        String fileKey = s3Service.uploadFile(file, folder.getId());

                        FileEntity fileEntity = FileEntity.builder()
                                .fileName(file.getOriginalFilename())
                                .size(file.getSize())
                                .folder(folder)
                                .key(fileKey)
                                .type(file.getContentType())
                                .build();

                        FileEntity savedFile = fileRepository.save(fileEntity);
                    });
                    return folder;
                })
                .orElseThrow(() -> new BadCredentialsException("Folder does not exist"));

        return folderEntity.getId();
    }
}
