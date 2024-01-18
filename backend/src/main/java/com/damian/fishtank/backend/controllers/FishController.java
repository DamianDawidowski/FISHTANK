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
import com.damian.fishtank.backend.services.FishService;

import jakarta.validation.Valid;

@RestController
public class FishController {
    
    @Autowired
    FishService fishService;

    @GetMapping("/fish")
     public ResponseEntity<List<FishDto>> getFish() {       
       return ResponseEntity.ok(fishService.getFish());
    }

    @GetMapping("/fish/{id}")
    public ResponseEntity<FishDto> getFish(@PathVariable Long id) {
        return ResponseEntity.ok(fishService.getFish(id));
    }
 
    @PostMapping("/fish")
    public ResponseEntity<FishDto> createFish(@Valid @RequestBody FishDto fishDto) {
        FishDto createdFish = fishService.createFish(fishDto);
        return ResponseEntity.created(URI.create("/fish/" + fishDto.getId())).body(createdFish);
    }

    @PutMapping("/fish/{id}")
    public ResponseEntity<FishDto> updateFish(@PathVariable Long id, @Valid @RequestBody FishDto fishDto) {
        return ResponseEntity.ok(fishService.updateFish(id, fishDto));
    }

    // @PatchMapping("/fish/{id}")
    // public ResponseEntity<FishDto> patchFish(@PathVariable Long id, @RequestBody FishDto fishDto) {
    //     return ResponseEntity.ok(fishService.patchFish(id, fishDto));
    // }
  
    @DeleteMapping("/fish/{id}")
    public ResponseEntity<FishDto> deleteFish(@PathVariable Long id) {
        return ResponseEntity.ok(fishService.deleteFish(id));
    }


}
