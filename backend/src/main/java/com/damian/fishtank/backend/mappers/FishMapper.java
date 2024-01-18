package com.damian.fishtank.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.damian.fishtank.backend.dtos.FishDto;
import com.damian.fishtank.backend.entities.Fish;

@Mapper(componentModel = "spring")
public interface FishMapper {
    
    Fish toFish(FishDto fishDto);

    FishDto toFishDto(Fish fish);

    List<FishDto> toFishDtos(List<Fish> fishes);

    void updateFish(@MappingTarget Fish target, Fish source);
}
