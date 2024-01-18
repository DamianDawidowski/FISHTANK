package com.damian.fishtank.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.damian.fishtank.backend.entities.Fish;

@Repository
public interface FishRepository extends JpaRepository<Fish, Long>{
    
}
