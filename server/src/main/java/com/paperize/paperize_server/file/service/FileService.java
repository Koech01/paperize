package com.paperize.paperize_server.file.service;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.file.data.CreateFileRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FileService {

    Optional<List<FileEntity>> getFolderFiles(UUID folderId);

    UUID saveFiles(CreateFileRequest body);

}
