package com.junaid.backend.repository;

import com.junaid.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Check if a user exists by their username
    boolean existsByUsername(String username);

    // Find a user entity by its username
    User findByUsername(String username);
}