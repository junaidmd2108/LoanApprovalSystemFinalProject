package com.junaid.backend.repository;

import com.junaid.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // username lookups
    boolean existsByUsername(String username);
    User findByUsername(String username);

    // email lookups
    boolean existsByEmail(String email);

    // government ID lookups
    boolean existsByIdNumber(String idNumber);
}