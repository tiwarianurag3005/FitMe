package com.backend.demo.service;

import com.backend.demo.model.User;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    User authenticateUser(String email, String password);
    Optional<User> findByEmail(String email);
    User saveUser(User user);
} 