package com.damian.fishtank.backend.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
 
import com.damian.fishtank.backend.dtos.TankDto; 
import com.damian.fishtank.backend.entities.Tank;
import com.damian.fishtank.backend.exceptions.AppException; 
import com.damian.fishtank.backend.mappers.TankMapper; 
import com.damian.fishtank.backend.repositories.TankRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class TankService { 

    private final  TankRepository tankRepository;
    private final TankMapper tankMapper;
 
    public TankDto getTank(Long id) {
        Tank tank = tankRepository.findTankByUserId(id)
        .orElseThrow(() -> new AppException("Tank not found", HttpStatus.NOT_FOUND));
        return tankMapper.toTankDto(tank);
    }
 
    public TankDto createTank(TankDto tankDto) {
        Tank tank = tankMapper.toTank(tankDto);
        Tank savedTank = tankRepository.save(tank);
        return tankMapper.toTankDto(savedTank);
    }

    public TankDto updateTank(Long id, TankDto tankDto) {
        Tank tank = tankRepository.findById(id)
        .orElseThrow(() -> new AppException("Tank not found", HttpStatus.NOT_FOUND));
        tankMapper.updateTank(tank, tankMapper.toTank(tankDto));
        Tank savedTank = tankRepository.save(tank);
        return tankMapper.toTankDto(savedTank);
    } 

    public TankDto deleteTank(Long id) {
        Tank tank = tankRepository.findById(id)
        .orElseThrow(() -> new AppException("Tank not found", HttpStatus.NOT_FOUND));
        TankDto tankDto = tankMapper.toTankDto(tank); 
        tankRepository.deleteById(id); 
        return tankDto;
    } 
}
