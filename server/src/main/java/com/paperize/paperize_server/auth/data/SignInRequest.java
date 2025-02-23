package com.paperize.paperize_server.auth.data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignInRequest {

    @Email
    @NotNull(message = "Email is required")
    private String email;
    private String password;

}
