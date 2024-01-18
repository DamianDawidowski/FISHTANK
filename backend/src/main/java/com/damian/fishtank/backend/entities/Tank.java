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
@Table(name = "tank")
@Entity
public class Tank {
    @Id
    @Column(name = "tank_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private long id; 

    @Column(name = "user_id")
    private Float userId;

    @Column(name = "tank_name")
    private String tankName;

    @Column(name = "length")
    private Float length;
  
    @Column(name = "height")
    private Float height;

    @Column(name = "depth")
    private Float depth;

    @Column(name = "ph")
    private Float ph;

    @Column(name = "dh")
    private Float dh; 

    @Column(name = "temperature")
    private Float temperature; 

    @Column(name = "fishesInTank")
    private String[] fishesInTank; 
 
}