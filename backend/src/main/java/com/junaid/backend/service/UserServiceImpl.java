package com.junaid.backend.service;

import com.junaid.backend.entity.User;
import com.junaid.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implements UserService, working with UserRepository to perform database operations.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Save a new user to the database.
     * (Typically used in your registration flow.)
     */
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Retrieve a user by their username.
     */
    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Check if a username already exists.
     */
    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * (Optional) Return all users.
     * You can remove this method if you don't need it.
     */
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}