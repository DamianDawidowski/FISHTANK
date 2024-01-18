package com.damian.fishtank.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.damian.fishtank.backend.dtos.SignUpDto;
import com.damian.fishtank.backend.dtos.UserDto;
import com.damian.fishtank.backend.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
