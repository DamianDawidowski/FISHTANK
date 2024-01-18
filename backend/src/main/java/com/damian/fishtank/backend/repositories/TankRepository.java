package com.damian.fishtank.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.damian.fishtank.backend.entities.Tank;

@Repository
public interface TankRepository extends JpaRepository<Tank, Long>{
    // @Query(value = "select tank_id,depth,dh,fishes_in_tank,height,length,ph,tank_name,temperature,user_id from tank where user_id=5")
        @Query(value = "SELECT u FROM  Tank u where u.userId=:userId")
      public Optional<Tank> findTankByUserId(@Param("userId")Long userId);
}
