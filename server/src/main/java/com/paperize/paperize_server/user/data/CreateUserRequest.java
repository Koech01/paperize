package com.paperize.paperize_server.user.data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateUserRequest {

    private String firstName;
    private String lastName;
    private String password;

    @NotNull(message = "Email is required")
    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

}
