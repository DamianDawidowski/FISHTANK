import { Component,Inject,Injectable,Input, OnInit } from "@angular/core";
import { Fishtank } from "src/app/shared/fishtank.model";
import { tankEval } from "../fishtank.component";

import {
    MatDialog,
    MAT_DIALOG_DATA, 
  } from '@angular/material/dialog'; 

  
@Component({
    selector: 'app-fishtank-errors',
    templateUrl: './fishtank-errors.component.html',
    styleUrls: ['./fishtank-errors.component.css'], 
})
export class fishtankErrors implements OnInit{ 
  @Input () tank: Fishtank;
  @Input () tankEval: tankEval;
    
  nr:number = 1;
  pHBlinkClass:string;
  dHBlinkClass:string;
  tempBlinkClass:string;
  volumeBlinkClass:string;
  volumeDifference: number; 
  volumeOnPage:number

  constructor(public dialog: MatDialog){}

  ngOnInit(): void { 
    if(this.tankEval) {
      this.makeEvaluation();
    }
  }  

  ngOnChanges(): void { 
    if(this.tankEval) {
       this.makeEvaluation();
    } 
  }  

  makeEvaluation(){ 
    this.volumeOnPage = Math.round((this.tankEval.volume)*2)/2
    this.volumeDifference = this.tankEval.volume / this.tankEval.neededVolume;
    this.pHBlinkClass = isNaN(this.tankEval.pHDifference) ? 'noValue' : (this.tankEval.pHDifference < 0.3 ? 'goodValue': (this.tankEval.pHDifference < 0.5 ? 'blink1' : (this.tankEval.pHDifference < 1.5 ? 'blink2' : 'blink3')))
    this.dHBlinkClass = isNaN(this.tankEval.pHDifference)  ? 'noValue' : (this.tankEval.dHDifference < 1 ? 'goodValue': (this.tankEval.dHDifference < 3 ? 'blink1' : (this.tankEval.dHDifference < 5 ? 'blink2' : 'blink3')))
    this.tempBlinkClass = isNaN(this.tankEval.pHDifference)  ? 'noValue' : (this.tankEval.tempDifference < 0.5 ? 'goodValue': (this.tankEval.tempDifference < 2 ? 'blink1' : (this.tankEval.tempDifference < 4 ? 'blink2' : 'blink3')))
    this.volumeBlinkClass = (isNaN(this.volumeDifference) || this.volumeDifference ===Infinity) ? 'noValue' : (this.volumeDifference >= 1 ? 'goodValue': (this.volumeDifference> 0.85 ? 'blink1' : (this.volumeDifference > 0.6 ? 'blink2' : 'blink3'))) 
  } 

  openDialog(EvalValueType: string,EvalDifference: string,type:string, currentValue: number) { 
    this.dialog.open(TankParameterEvalDialog, {
      data: {
        recommendedValue: this.tankEval[EvalValueType],
          type: type,
          currentValue:currentValue,
          difference:  EvalDifference,
      },
    });
  } 
}

@Injectable()
@Component({
    selector: 'tankParameter-dialog',
    templateUrl: './tankParameter-dialog.component.html', 
  })
export class TankParameterEvalDialog {
  isDatamatchingMessage:string;

  constructor(@Inject(MAT_DIALOG_DATA) public recommendedValue: number, @Inject(MAT_DIALOG_DATA) public type: string,
  @Inject(MAT_DIALOG_DATA) public currentValue: number,@Inject(MAT_DIALOG_DATA) public difference: string) {}
    
  ngOnInit() { 
    this.makeEvaluation();
  }
    
  makeEvaluation(){ 
    this.recommendedValue = Math.round((this.recommendedValue['recommendedValue'])*2)/2;
    this.type = this.type['type'];
    this.difference = this.difference['difference'];
    this.currentValue = Math.round((this.currentValue['currentValue'])*2)/2; 
    if(this.difference === 'goodValue' ) {
      this.isDatamatchingMessage = 'matches'
      if(this.type === 'volume') {
        this.isDatamatchingMessage = 'L '+this.isDatamatchingMessage;
      }
      if(this.type === 'dH') {
        this.isDatamatchingMessage = 'dH '+this.isDatamatchingMessage;
      }
    } else if (this.difference ===  'blink1' ) {
        this.isDatamatchingMessage = 'is close to'
    } else if (this.difference  ===  'blink2') {
        this.isDatamatchingMessage = 'differs from'
    } else {
        this.isDatamatchingMessage = 'is too far from'
    }  
  }

    ngOnChanges(){ 
      this.makeEvaluation();
    } 
}
  