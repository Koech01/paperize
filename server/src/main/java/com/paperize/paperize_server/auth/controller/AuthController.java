package com.paperize.paperize_server.auth.controller;

import com.paperize.paperize_server.auth.data.SignInRequest;
import com.paperize.paperize_server.auth.service.AuthService;
import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.data.CreateUserRequest;
import com.paperize.paperize_server.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ServerProperties serverProperties;
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(
            HttpServletRequest request,
            HttpServletResponse response,
            @Valid @RequestBody SignInRequest body
    ) {
        authService.signIn(request, response, body);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<UserEntity> createUser(
            HttpServletRequest request,
            HttpServletResponse response,
            @Valid @RequestBody CreateUserRequest user
    ) {
        UserEntity newUser = userService.createUser(user);
        authService.signIn(
                request,
                response,
                SignInRequest.builder()
                        .email(user.getEmail())
                        .password(user.getPassword())
                        .build()
        );
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        authService.signOut(request, response);
        return ResponseEntity.ok().build();
    }

}
