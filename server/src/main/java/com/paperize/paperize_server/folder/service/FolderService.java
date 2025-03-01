package com.paperize.paperize_server.folder.service;

import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.folder.data.CreateFolderRequest;

public interface FolderService {

    FolderEntity createFolder(CreateFolderRequest folder);

}
