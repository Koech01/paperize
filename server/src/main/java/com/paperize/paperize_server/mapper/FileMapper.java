package com.paperize.paperize_server.mapper;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.FileDto;
import com.paperize.paperize_server.utils.S3Service;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FileMapper {

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
}
