package com.paperize.paperize_server.file.controller;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.FileDto;
import com.paperize.paperize_server.file.service.FileService;
import com.paperize.paperize_server.mapper.EntityDtoMapper;
import com.paperize.paperize_server.utils.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileService fileService;
    private final S3Service s3Service;

    @GetMapping("/{folderId}")
    public ResponseEntity<Optional<List<FileDto>>> getFolderFiles(@PathVariable String folderId) {
        Optional<List<FileEntity>> folderFiles = fileService.getFolderFiles(UUID.fromString(folderId));

        EntityDtoMapper fileMapper = new EntityDtoMapper(s3Service);
        List<FileDto> fileDtos = folderFiles
                .map(files -> files.stream()
                        .map(fileMapper::toFileDto)
                        .collect(Collectors.toList()))
                .orElse(null);
        return new ResponseEntity<>(Optional.ofNullable(fileDtos), HttpStatus.OK);
    }

}
