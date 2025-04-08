package com.paperize.paperize_server.auth.service;

import com.paperize.paperize_server.auth.data.SignInRequest;
import com.paperize.paperize_server.auth.data.SignUpRequest;
import com.paperize.paperize_server.auth.data.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    UserResponse signIn(HttpServletRequest request,
                        HttpServletResponse response,
                        SignInRequest body);

    UserResponse signUp(HttpServletRequest request,
                        HttpServletResponse response,
                        SignUpRequest data);

    void signOut(HttpServletRequest request, HttpServletResponse response);

    UserResponse getCurrentUser(HttpServletRequest request);

}