package com.paperize.paperize_server.user.service.impl;

import com.paperize.paperize_server.jobs.SendWelcomeEmailJob;
import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.VerificationCodeEntity;
import com.paperize.paperize_server.user.data.CreateUserRequest;
import com.paperize.paperize_server.user.repository.UserRepository;
import com.paperize.paperize_server.user.repository.VerificationCodeRepository;
import com.paperize.paperize_server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.jobrunr.scheduling.BackgroundJobRequest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final VerificationCodeRepository verificationCodeRepository;

    @Override
    @Transactional
    public UserEntity createUser(CreateUserRequest data) {
        userRepository.findByEmail(data.getEmail())
                .ifPresent(user -> {
                    throw new BadCredentialsException("User with email " + data.getEmail() + " already exists");
                });
        UserEntity userEntity = new UserEntity(data);
        UserEntity newUser = userRepository.save(userEntity);
        sendVerificationEmail(newUser);
        return newUser;
    }

    private void sendVerificationEmail(UserEntity user) {
        VerificationCodeEntity verificationCode = new VerificationCodeEntity(user);
        user.setVerificationCode(verificationCode);
        userRepository.save(user);
//        verificationCodeRepository.save(verificationCode);
        SendWelcomeEmailJob sendWelcomeEmailJob = new SendWelcomeEmailJob(user.getId());
        BackgroundJobRequest.enqueue(sendWelcomeEmailJob);
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
