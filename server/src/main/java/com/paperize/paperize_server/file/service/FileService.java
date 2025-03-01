package com.paperize.paperize_server.file.service;

import com.paperize.paperize_server.file.data.CreateFileRequest;

import java.util.UUID;

public interface FileService {

    UUID saveFiles(CreateFileRequest body);

}
