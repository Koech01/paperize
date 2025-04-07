package com.paperize.paperize_server.auth.data;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserResponse {

    private UUID userId;
    private String email;
    private String firstName;
    private String lastName;

}
