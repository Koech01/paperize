package com.paperize.paperize_server.user.service.impl;

import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.data.CreateUserRequest;
import com.paperize.paperize_server.user.repository.UserRepository;
import com.paperize.paperize_server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserEntity createUser(CreateUserRequest data) {
        userRepository.findByEmail(data.getEmail())
                .ifPresent(user -> {
                    throw new BadCredentialsException("User with email " + data.getEmail() + " already exists");
                });
        UserEntity userEntity = new UserEntity(data);
        return userRepository.save(userEntity);
    }

    @Override
    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadCredentialsException("Cannot find user with email " + email)
                );
    }

    @Override
    public List<UserEntity> getUsers() {
        return userRepository.findAll();
    }
}
