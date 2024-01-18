package com.damian.fishtank.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.damian.fishtank.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByLogin(String login);
}
