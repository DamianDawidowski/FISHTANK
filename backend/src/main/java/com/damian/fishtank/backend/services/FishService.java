package com.damian.fishtank.backend.services;

import java.util.List; 
 
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.damian.fishtank.backend.dtos.FishDto;
import com.damian.fishtank.backend.entities.Fish;
import com.damian.fishtank.backend.exceptions.AppException;
import com.damian.fishtank.backend.mappers.FishMapper;
import com.damian.fishtank.backend.repositories.FishRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FishService {

    private final FishRepository fishRepository;
    private final FishMapper fishMapper;
    
    public List<FishDto> getFish(){
        return fishMapper.toFishDtos(fishRepository.findAll());  
    }
    
    public FishDto getFish(Long id) {
        Fish fish = fishRepository.findById(id)
        .orElseThrow(() -> new AppException("Fish not found", HttpStatus.NOT_FOUND));
        return fishMapper.toFishDto(fish);
    }
 
    public FishDto createFish(FishDto fishDto) {
        Fish fish = fishMapper.toFish(fishDto);
        Fish savedFish = fishRepository.save(fish);
        return fishMapper.toFishDto(savedFish);
    }
 
    public FishDto updateFish(Long id, FishDto fishDto) {
        Fish fish = fishRepository.findById(id)
        .orElseThrow(() -> new AppException("Fish not found", HttpStatus.NOT_FOUND));
        fishMapper.updateFish(fish, fishMapper.toFish(fishDto));
        Fish savedFish = fishRepository.save(fish);
        return fishMapper.toFishDto(savedFish);
    } 

    public FishDto deleteFish(Long id) {
        Fish fish = fishRepository.findById(id)
        .orElseThrow(() -> new AppException("Fish not found", HttpStatus.NOT_FOUND));
        FishDto fishDto = fishMapper.toFishDto(fish); 
        fishRepository.deleteById(id); 
        return fishDto;
    }
 
}
