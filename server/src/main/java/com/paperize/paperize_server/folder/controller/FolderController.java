package com.paperize.paperize_server.folder.controller;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.FileDto;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.data.CreateFolderRequest;
import com.paperize.paperize_server.folder.service.FolderService;
import com.paperize.paperize_server.mapper.FileMapper;
import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.utils.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
@Slf4j
public class FolderController {

    private final FolderService folderService;
    private final S3Service s3Service;

    // TODO: Get all folders (Testing purposes)
    @GetMapping("/all")
    public ResponseEntity<?> getAllFolders() {
        List<FolderEntity> allFolders = folderService.getAllFolders();
        log.info("All folders - {}", allFolders);
        return new ResponseEntity<>(allFolders, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<FolderEntity>> getRootFolders(Authentication authentication) {
        log.info("Auth object - {}", authentication);
        UserEntity principal = (UserEntity) authentication.getPrincipal();
        return new ResponseEntity<>(folderService.getRootFolders(principal.getId()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FolderEntity> createFolder(
            @RequestPart("name") String name,
            @RequestPart(value = "parent", required = false) String parentId,
            @RequestParam(value = "files", required = false) List<MultipartFile> files
    ) {
        CreateFolderRequest folderRequest = CreateFolderRequest.builder()
                .files(files)
                .name(name)
                .parentId(parentId)
                .build();
        FolderEntity folder = folderService.createFolder(folderRequest);
        return new ResponseEntity<>(folder, HttpStatus.CREATED);
    }

    @GetMapping("/{folderId}/files")
    public ResponseEntity<List<FileDto>> getFolderFiles(
            @PathVariable String folderId,
            @RequestParam(required = false) String type
    ) {
        FileMapper fileMapper = new FileMapper(s3Service);
        Optional<List<FileEntity>> folderFiles;

        if (type != null) {
            folderFiles = folderService.getFolderFilesByType(UUID.fromString(folderId), type);
        } else {
            folderFiles = folderService.getFolderFiles(UUID.fromString(folderId));
        }

        List<FileDto> fileDtos = folderFiles
                .map(files -> files.stream()
                        .map(fileMapper::toFileDto)
                        .collect(Collectors.toList()))
                .orElseGet(Collections::emptyList);

        return new ResponseEntity<>(fileDtos, HttpStatus.OK);
    }

    @GetMapping("/{folderId}")
    public ResponseEntity<FolderEntity> getFolder(@PathVariable String folderId) {
        return new ResponseEntity<>(folderService.getFolderById(UUID.fromString(folderId)), HttpStatus.OK);
    }
}
