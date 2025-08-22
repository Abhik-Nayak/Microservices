package com.abhi.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.userservice.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
