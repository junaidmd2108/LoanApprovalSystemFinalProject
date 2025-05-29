package com.junaid.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.junaid.backend.entity.User;
import com.junaid.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public User register(User user) {
        if (repository.existsByName(user.getName())) {
            // throws a 409 Conflict with this message
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        return repository.save(user);
    }

    @Override
    public User login(User loginRequest) {
        User found = repository.findByName(loginRequest.getName());
        if (found == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        }
        if (!found.getPassword().equals(loginRequest.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
        }

        return found;
    }
}