package com.ecom.repository;

import com.ecom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
    // You can also add custom queries like:
    User findByUsername(String username);

    boolean existsByEmail(String email);
    User findByEmail(String email);
}