package com.paperize.paperize_server.user.controller;

import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UsersController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserEntity>> getUsers() {
        List<UserEntity> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/get-user/")
    public ResponseEntity<UserEntity> createUser(@RequestBody String email) {
        UserEntity user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

}
