package com.paperize.paperize_server.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.bucket-name}")
    private String bucketName;

    public String uploadFile (MultipartFile file, UUID folderId) {
        try {
            String fileKey = String.valueOf(folderId) + "/" + generateUniqueKey(Objects.requireNonNull(file.getOriginalFilename()));
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .contentType(file.getContentType())
                    .key(fileKey)
                    .build();

            s3Client.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            return fileKey;
        } catch (IOException e) {
            throw new UncheckedIOException("Error reading file - ", e);
        }
    }

    private String generateUniqueKey(String filename) {
        String randomString = UUID.randomUUID().toString();
        return randomString + "-" + filename.replace(" ", "_");
    }

}
