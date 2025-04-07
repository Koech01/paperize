package com.paperize.paperize_server.user.service;

import com.paperize.paperize_server.user.UserEntity;

import java.util.List;

public interface UserService {

    UserEntity getUserByEmail(String email);

    List<UserEntity> getUsers();
}
