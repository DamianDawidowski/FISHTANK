package com.damian.fishtank.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.damian.fishtank.backend.dtos.TankDto;
import com.damian.fishtank.backend.entities.Tank;

@Mapper(componentModel = "spring")
public interface TankMapper {
    
    Tank toTank(TankDto tankDto);

    TankDto toTankDto(Tank tank); 

    void updateTank(@MappingTarget Tank target, Tank source);
}
