package com.paperize.paperize_server.auth;

import com.paperize.paperize_server.user.UserEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

public class SecurityUtils {

    public static UUID getCurrentUserId() {
        UserEntity principal = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getId();
    }
}
