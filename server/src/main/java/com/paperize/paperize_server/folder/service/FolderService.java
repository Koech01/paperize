package com.paperize.paperize_server.folder.service;

import com.paperize.paperize_server.file.FileEntity;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.data.CreateFolderRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FolderService {

    List<FolderEntity> getAllFolders();

    List<FolderEntity> getRootFolders(UUID userId);

    FolderEntity createFolder(CreateFolderRequest folder);

    Optional<List<FileEntity>> getFolderFiles(UUID folderId);

    FolderEntity getFolderById(UUID folderId);

}
