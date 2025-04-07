package com.paperize.paperize_server.user.service.impl;

import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.repository.UserRepository;
import com.paperize.paperize_server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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
