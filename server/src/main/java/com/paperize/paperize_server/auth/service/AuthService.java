package com.paperize.paperize_server.auth.service;

import com.paperize.paperize_server.auth.data.SignInRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
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

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    public void signIn(HttpServletRequest request,
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
    }

    public void signOut(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.logoutHandler.logout(request, response, authentication);
    }
}
