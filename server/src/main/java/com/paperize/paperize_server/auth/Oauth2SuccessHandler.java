package com.paperize.paperize_server.auth;

import com.paperize.paperize_server.auth.data.SignUpRequest;
import com.paperize.paperize_server.config.ApplicationProperties;
import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final ApplicationProperties applicationProperties;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        log.info("Oauth2 success handler");
        OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) authentication;
        String email = authenticationToken.getPrincipal().getAttribute("email");
        log.info("Email: {}", email);

        UserEntity user = userRepository.findByEmail(email).orElseGet(() -> {
            String name = authenticationToken.getPrincipal().getAttribute("name");
            SignUpRequest userRequest = SignUpRequest.builder()
                    .firstName(name.substring(0, name.indexOf(' ')))
                    .lastName(name.substring(name.indexOf(' ') + 1))
                    .email(email)
                    .build();
            return userRepository.save(new UserEntity(
                    userRequest.getFirstName(),
                    userRequest.getLastName(),
                    userRequest.getEmail(),
                    userRequest.getPassword()
            ));
        });

        log.info("User: {}", user);

        authenticateUser(user, response);
    }

    private void authenticateUser(UserEntity user, HttpServletResponse response) throws IOException {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(token);
        response.sendRedirect(applicationProperties.getSignInSuccessUrl());
    }
}
