package com.paperize.paperize_server.file.data;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileDto {

    private String id;
    private String fileName;
    private String type;
    private Long size;
    private String key;
    private String url;
    private String createdAt;

}
