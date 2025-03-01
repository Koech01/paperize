package com.paperize.paperize_server.folder.data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class CreateFolderRequest {

    @NotNull(message = "Name is required")
    @NotBlank(message = "Name is required")
    private String name;
    private String parentId;
    private List<MultipartFile> files;

}
