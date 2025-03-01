package com.paperize.paperize_server.file.controller;

import com.paperize.paperize_server.file.data.CreateFileRequest;
import com.paperize.paperize_server.file.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileService fileService;

    @PostMapping("/{folderId}")
    public ResponseEntity<UUID> saveFiles(
            @PathVariable String folderId,
            @RequestParam(value = "files") List<MultipartFile> files
    ) {
        CreateFileRequest fileRequest = CreateFileRequest.builder()
                .files(files)
                .folderId(folderId)
                .build();
        log.info("Files received - {}", fileRequest);

        UUID requestFolderId = fileService.saveFiles(fileRequest);
        return new ResponseEntity<>(requestFolderId, HttpStatus.CREATED);
    }

}
