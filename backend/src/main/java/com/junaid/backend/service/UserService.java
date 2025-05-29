package com.junaid.backend.service;

import com.junaid.backend.entity.User;

public interface UserService {
    /**
     * Register a new user or throw a 409 if the username already exists.
     */
    User register(User user);
    User login(User loginRequest);
}