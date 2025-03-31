package com.paperize.paperize_server.folder.utils;

import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.utils.S3Service;
import jakarta.persistence.PreRemove;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class FolderEntityListener {

    private static S3Service s3Service;

    @Autowired
    public void setS3Service(S3Service s3Service) {
        FolderEntityListener.s3Service = s3Service;
    }

    @PreRemove
    private void deleteS3Files(FolderEntity folder) {
        folder.getFiles().forEach(file -> {
            s3Service.deleteFile(file.getKey());
            log.info("Deleted S3 file with key: {}", file.getKey());
        });

        folder.getChildren().forEach(this::deleteS3Files);
    }

}
