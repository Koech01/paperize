package com.paperize.paperize_server.user.service;

import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.data.CreateUserRequest;

import java.util.List;

public interface UserService {

    UserEntity createUser(CreateUserRequest data);

    UserEntity getUserByEmail(String email);

    List<UserEntity> getUsers();
}
