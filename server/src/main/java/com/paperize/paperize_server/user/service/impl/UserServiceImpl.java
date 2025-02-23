package com.paperize.paperize_server.user.service.impl;

import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.data.CreateUserRequest;
import com.paperize.paperize_server.user.repository.UserRepository;
import com.paperize.paperize_server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserEntity createUser(CreateUserRequest data) {
        UserEntity userEntity = new UserEntity(data);
        return userRepository.save(userEntity);
    }

    @Override
    public List<UserEntity> getUsers() {
        return userRepository.findAll();
    }
}
