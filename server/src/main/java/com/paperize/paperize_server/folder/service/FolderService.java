package com.paperize.paperize_server.folder.service;

import com.paperize.paperize_server.folder.data.CreateFolderRequest;

import java.util.UUID;

public interface FolderService {

    UUID createFolder(CreateFolderRequest folder);

}
