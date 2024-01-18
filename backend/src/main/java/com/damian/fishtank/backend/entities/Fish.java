package com.damian.fishtank.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "fish")
@Entity
public class Fish {
    @Id
    @Column(name = "fish_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private long id; 

    @Column(name = "common_name")
    private String commonName;

    @Column(name = "latin_name")
    private String latinName;

    @Column(name = "common_length")
    private Float commonLength;
  
    @Column(name = "picture_link")
    private String pictureLink;

    @Column(name = "ph_minimum")
    private Float phMin;

    @Column(name = "ph_maximum")
    private Float phMax;

    @Column(name = "dh_minimum")
    private Float dhMin;

    @Column(name = "dh_maximum")
    private Float dhMax;

    @Column(name = "temp_minimum")
    private Float tempMin;

    @Column(name = "temp_maximum")
    private Float tempMax;

    @Column(name = "calmness")
    private Float calmness; 

    @Column(name = "schooling")
    private Boolean schooling; 

 
}
