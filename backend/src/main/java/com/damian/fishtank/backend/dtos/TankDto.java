package com.damian.fishtank.backend.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter
public class TankDto {
    private Long id;
    @NotNull
    private Long userId;
    @NotNull
    private String tankName;
    @NotNull
    private Float length;
    @NotNull
    private Float height;
    @NotNull
    private Float depth; 
    
    private Float ph;
    
    private Float dh;
    
    private Float temperature;
    
    private String[] fishesInTank;   
}

 