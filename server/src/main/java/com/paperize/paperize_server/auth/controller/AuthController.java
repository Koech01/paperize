package com.paperize.paperize_server.auth.controller;

import com.paperize.paperize_server.auth.data.SignInRequest;
import com.paperize.paperize_server.auth.data.SignUpRequest;
import com.paperize.paperize_server.auth.data.UserResponse;
import com.paperize.paperize_server.auth.service.AuthService;
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

    private final AuthService authService;

    @PostMapping("/sign-in/")
    public ResponseEntity<UserResponse> signIn(
            HttpServletRequest request,
            HttpServletResponse response,
            @Valid @RequestBody SignInRequest body
    ) {
        UserResponse userResponse = authService.signIn(request, response, body);
        return new ResponseEntity(userResponse, HttpStatus.OK);
    }

    @PostMapping("/sign-up/")
    public ResponseEntity<UserResponse> createUser(
            HttpServletRequest request,
            HttpServletResponse response,
            @Valid @RequestBody SignUpRequest user
    ) {
        UserResponse userResponse = authService.signUp(request, response, user);
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }

    @PostMapping("/sign-out/")
    public ResponseEntity<?> signOut(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        authService.signOut(request, response);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me/")
    public ResponseEntity<UserResponse> getMe(
            HttpServletRequest request
    ) {
        UserResponse user = authService.getCurrentUser(request);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
