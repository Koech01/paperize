package com.paperize.paperize_server.file.data;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class CreateFileRequest {

    @NotEmpty(message = "Files are required")
    private List<MultipartFile> files;
    private String folderId;

}
