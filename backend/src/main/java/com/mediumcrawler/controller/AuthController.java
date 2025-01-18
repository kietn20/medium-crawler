package com.mediumcrawler.controller;

import com.mediumcrawler.model.User;
import com.mediumcrawler.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User registeredUser = userService.registerUser(user);

        registeredUser.setPassword(null);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        return userService.findByEmail(loginRequest.getEmail())
                .filter(user -> passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
                .map(user -> ResponseEntity.ok("Login successful"))
                .orElse(ResponseEntity.status(401).body("Invalid email or password."));
    }

}