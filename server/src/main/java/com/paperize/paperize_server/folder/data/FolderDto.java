package com.paperize.paperize_server.folder.data;

import com.paperize.paperize_server.file.data.FileDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FolderDto {

    private String id;
    private String userId;
    private String name;
    private List<FolderDto> children;
    private List<FileDto> files;
    private String createdAt;
    private String updatedAt;

}
