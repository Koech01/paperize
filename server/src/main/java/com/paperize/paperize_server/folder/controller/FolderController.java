package com.paperize.paperize_server.folder.controller;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.data.CreateFolderRequest;
import com.paperize.paperize_server.folder.service.FolderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
@Slf4j
public class FolderController {

    private final FolderService folderService;

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
    public ResponseEntity<Optional<List<FileEntity>>> getFolderFiles(@PathVariable String folderId) {
        Optional<List<FileEntity>> folderFiles = folderService.getFolderFiles(UUID.fromString(folderId));
        return new ResponseEntity<>(folderFiles, HttpStatus.CREATED);
    }

}
