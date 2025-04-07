package com.paperize.paperize_server.auth.service.impl;

import com.paperize.paperize_server.auth.SecurityUtils;
import com.paperize.paperize_server.auth.data.SignInRequest;
import com.paperize.paperize_server.auth.data.UserResponse;
import com.paperize.paperize_server.auth.data.SignUpRequest;
import com.paperize.paperize_server.auth.service.AuthService;
import com.paperize.paperize_server.jobs.SendWelcomeEmailJob;
import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.VerificationCodeEntity;
import com.paperize.paperize_server.user.repository.UserRepository;
import com.paperize.paperize_server.user.repository.VerificationCodeRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jobrunr.scheduling.BackgroundJobRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final VerificationCodeRepository verificationCodeRepository;

    private SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @Override
    @Transactional
    public UserResponse signUp(HttpServletRequest request,
                               HttpServletResponse response,
                               SignUpRequest data) {
        userRepository.findByEmail(data.getEmail())
                .ifPresent(user -> {
                    throw new BadCredentialsException("User with email " + data.getEmail() + " already exists");
                });
        UserEntity userEntity = new UserEntity(
                data.getFirstName(),
                data.getLastName(),
                data.getEmail(),
                data.getPassword()
        );
        UserEntity newUser = userRepository.save(userEntity);
        sendVerificationEmail(newUser);
        return signIn(
                request,
                response,
                SignInRequest.builder()
                    .email(data.getEmail())
                    .password(data.getPassword())
                    .build()
        );
    }

    @Override
    public UserResponse signIn(HttpServletRequest request,
                               HttpServletResponse response,
                               SignInRequest body
    ) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(body.getEmail(), body.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
        SecurityContext context = securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, request, response);

        return UserResponse.builder()
                .userId(((UserEntity) authentication.getPrincipal()).getId())
                .firstName(((UserEntity) authentication.getPrincipal()).getFirstName())
                .lastName(((UserEntity) authentication.getPrincipal()).getLastName())
                .email(((UserEntity) authentication.getPrincipal()).getEmail())
                .build();
    }

    @Override
    public void signOut(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.logoutHandler.logout(request, response, authentication);
    }

    @Override
    public UserResponse getCurrentUser(HttpServletRequest request) {
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return UserResponse.builder()
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }

    private void sendVerificationEmail(UserEntity user) {
        VerificationCodeEntity verificationCode = new VerificationCodeEntity(user);
        user.setVerificationCode(verificationCode);
        userRepository.save(user);
        SendWelcomeEmailJob sendWelcomeEmailJob = new SendWelcomeEmailJob(user.getId());
        BackgroundJobRequest.enqueue(sendWelcomeEmailJob);
    }
}
