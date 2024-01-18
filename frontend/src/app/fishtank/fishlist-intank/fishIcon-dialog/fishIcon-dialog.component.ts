import { Component, Inject, Injectable } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Injectable()
@Component({
    selector: 'fishIcon-dialog',
    templateUrl: './fishIcon-dialog.component.html', 
    styleUrls: ['./fishtank-dialog.component.css']
  })
  export class fishIconDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public fishName: string, @Inject(MAT_DIALOG_DATA) public type: string,
    @Inject(MAT_DIALOG_DATA) public valueDifferenceOrProblemFishes: number | string[], @Inject(MAT_DIALOG_DATA) public tankName: string,
    @Inject(MAT_DIALOG_DATA) public lengthRatio:number, @Inject(MAT_DIALOG_DATA) public depthRatio:number, @Inject(MAT_DIALOG_DATA) public heightRatio:number) {
        // console.log('tankEval in dialogue is: '+ (this.data['tankEval']))
        // console.log('tankEval in dialogue is: '+ (this.data['tankEval'].TankId))
        // console.log('tankEval in dialogue is: '+ JSON.stringify(this.data ))
    //     console.log('type in dialogue is: '+ (this.type['type']))
    //  console.log('recommendedValue in dialogue is: '+ (this.recommendedValue['recommendedValue']))
    }
     aggresors:string[]=[];
     predators:string[]=[];
     differenceValue:number=0; 
     desiredLength:number=0; 
     desiredDepth:number=0; 
     desiredHeight:number=0; 
     absoluteDifferenceValue:number=0; 
    ngOnInit() {
      console.log('valueDifferenceOrProblemFishes is :'+this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'])
    //    let difference:number;
    this.makeEvaluation();
    // console.log('aggresors is :'+this.aggresors)
      }
      
      makeEvaluation(){
        this.fishName =  this.fishName['fishName'];
            // this.recommendedValue = Math.round((this.recommendedValue['recommendedValue'])*2)/2;
       this.type =  this.type['type']; 
       this.tankName =  this.tankName['tankName'];
       


       if(this.type === 'aggresors') {
        // this.aggresors.concat(this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as string[]);
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
        // this.differenceValue = Math.max(Math.round((this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes']*2)/2),0.5) as number;
      this.absoluteDifferenceValue = Math.abs(this.differenceValue)
       } 
      //  else if(this.type === 'dH') {
        // this.differenceValue = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as number;

      //   this.differenceValue = Math.round(this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes']*2)/2 as number;
      //   this.absoluteDifferenceValue = Math.abs(this.differenceValue)
      //  } 
       else if(this.type === 'ok') {
        this.differenceValue = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as number;
       } else if(this.type === 'overcrowded') {
        this.differenceValue = this.valueDifferenceOrProblemFishes['valueDifferenceOrProblemFishes'] as number;
       } 
      } 
    }
  