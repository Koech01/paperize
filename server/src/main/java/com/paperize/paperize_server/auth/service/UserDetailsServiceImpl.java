package com.paperize.paperize_server.auth.service;

import com.paperize.paperize_server.user.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws BadCredentialsException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Cannot find user with email " + email));
    }
}
