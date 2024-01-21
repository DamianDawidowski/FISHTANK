package com.damian.fishtank.backend.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.damian.fishtank.backend.dtos.FishDto;
import com.damian.fishtank.backend.dtos.TankDto;
import com.damian.fishtank.backend.services.FishService;
import com.damian.fishtank.backend.services.TankService;

import jakarta.validation.Valid;

@RestController
public class TankController {
  
      
    @Autowired
    TankService tankService;
 
    //Searches by user ID, not tank ID!
    @GetMapping("/fishtank/{id}")
    public ResponseEntity<TankDto> getTank(@PathVariable Long id) {
        return ResponseEntity.ok(tankService.getTank(id));
    }
 
    @PostMapping("/fishtank")
    public ResponseEntity<TankDto> createTank(@Valid @RequestBody TankDto tankDto) {
        TankDto createdTank = tankService.createTank(tankDto);
        return ResponseEntity.created(URI.create("/fishtank/" + tankDto.getId())).body(createdTank);
    }


   @PutMapping("/fishtank/{id}")
    public ResponseEntity<TankDto> updateTank(@PathVariable Long id, @Valid @RequestBody TankDto tankDto) {
        return ResponseEntity.ok(tankService.updateTank(id, tankDto));
    }

     
    @DeleteMapping("/fishtank/{id}")
    public ResponseEntity<TankDto> deleteFish(@PathVariable Long id) {
        return ResponseEntity.ok(tankService.deleteTank(id));
    }
 
}
