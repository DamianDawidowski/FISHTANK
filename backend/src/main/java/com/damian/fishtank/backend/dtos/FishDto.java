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
public class FishDto {
    private Long id;
    @NotNull
    private String commonName;
    @NotNull
    private String latinName;
    @NotNull
    private Float commonLength;
    @NotNull
    private String pictureLink;
    @NotNull
    private Float phMin;
    @NotNull
    private Float phMax;
    @NotNull
    private Float dhMin;
    @NotNull
    private Float dhMax;
    @NotNull
    private Float tempMin;
    @NotNull
    private Float tempMax;  
    @NotNull
    private Float calmness; 
    @NotNull
    private Boolean schooling; 
}