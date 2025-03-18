package com.paperize.paperize_server.mapper;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.FileDto;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.data.FolderDto;
import com.paperize.paperize_server.utils.S3Service;
import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

@RequiredArgsConstructor
public class EntityDtoMapper {

    private final S3Service s3Service;

    public FileDto toFileDto(FileEntity file) {
        String presignedUrl = s3Service.createPresignedGetUrl(file.getKey());

        return com.paperize.paperize_server.file.data.FileDto.builder()
                .id(file.getId())
                .fileName(file.getFileName())
                .type(file.getType())
                .size(file.getSize())
                .key(file.getKey())
                .url(presignedUrl)
                .createdAt(file.getCreatedAt().toString())
                .build();
    }

    public FolderDto toFolderDto(FolderEntity folder) {
        return com.paperize.paperize_server.folder.data.FolderDto.builder()
                .id(String.valueOf(folder.getId()))
                .userId(String.valueOf(folder.getUserId()))
                .name(folder.getName())
                .children(folder.getChildren().stream()
                        .map(this::toFolderDto)
                        .collect(Collectors.toList())
                )
                .files(folder.getFiles().stream()
                        .map(this::toFileDto)
                        .collect(Collectors.toList())
                )
                .createdAt(folder.getCreatedAt().toString())
                .updatedAt(folder.getUpdatedAt().toString())
                .build();
    }
}
