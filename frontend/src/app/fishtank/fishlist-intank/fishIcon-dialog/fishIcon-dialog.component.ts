import { Component, Inject, Injectable } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Injectable()
@Component({
    selector: 'fishIcon-dialog',
    templateUrl: './fishIcon-dialog.component.html', 
    styleUrls: ['./fishtank-dialog.component.css']
  })
export class fishIconDialog {
  aggresors:string[]=[];
  predators:string[]=[];
  differenceValue:number=0; 
  desiredLength:number=0; 
  desiredDepth:number=0; 
  desiredHeight:number=0; 
  absoluteDifferenceValue:number=0;  

  constructor(@Inject(MAT_DIALOG_DATA) public fishName: string, @Inject(MAT_DIALOG_DATA) public type: string,
    @Inject(MAT_DIALOG_DATA) public valueDifferenceOrProblemFishes: number | string[], @Inject(MAT_DIALOG_DATA) public tankName: string,
    @Inject(MAT_DIALOG_DATA) public lengthRatio:number, @Inject(MAT_DIALOG_DATA) public depthRatio:number,
    @Inject(MAT_DIALOG_DATA) public heightRatio:number) {}

  ngOnInit() {
    this.makeEvaluation(); 
  }
      
  makeEvaluation(){
    this.fishName =  this.fishName['fishName']; 
    this.type =  this.type['type']; 
    this.tankName =  this.tankName['tankName']; 
    if(this.type === 'aggresors') {
      this.aggresors = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'];
    } else if(this.type === 'predators') {
      this.predators = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as string[];
    }
    else if(this.type === 'school') {
      this.differenceValue = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as number;
    }
    else if(this.type === 'dimensions') {
      this.differenceValue = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as number;
      this.lengthRatio =  this.lengthRatio['lengthRatio'];
      this.depthRatio =  this.depthRatio['depthRatio'];
      this.heightRatio =  this.heightRatio['heightRatio'];
      this.desiredLength =  this.differenceValue*4
      this.desiredDepth =   this.differenceValue*1.5
      this.desiredHeight =   this.differenceValue*1.5 
    } else if(this.type === 'pH' || this.type === 'temperature' || this.type === 'dH') { 
      this.differenceValue = Math.round(this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes']*2)/2 as number;
      this.absoluteDifferenceValue = Math.abs(this.differenceValue)
    } 
    else if(this.type === 'ok') {
      this.differenceValue = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as number;
    } else if(this.type === 'overcrowded') {
      this.differenceValue = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as number;
    } 
  } 
}