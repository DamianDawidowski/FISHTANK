import { Component,Inject,Injectable,Input, OnInit } from "@angular/core";
import { Fishtank } from "src/app/shared/fishtank.model";
import { fishEval, tankEval } from "../fishtank.component";

import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogContent,
  } from '@angular/material/dialog';
  import {MatButtonModule} from '@angular/material/button';

  
@Component({
    selector: 'app-fishtank-errors',
    templateUrl: './fishtank-errors.component.html',
    styleUrls: ['./fishtank-errors.component.css'], 
})
export class fishtankErrors implements OnInit{
      constructor(public dialog: MatDialog){}

    @Input () tank: Fishtank;
    @Input () tankEval: tankEval;
   
    
    nr:number = 1;
    pHBlinkClass:string;
    dHBlinkClass:string;
    tempBlinkClass:string;
    volumeBlinkClass:string;
    volumeDifference: number; 
    volumeOnPage:number

  ngOnInit(): void {
    // console.log('first evaluation')
    if(this.tankEval) {
      this.makeEvaluation();
   }
  }  

  ngOnChanges(): void {
    // console.log('new evaluation')
    // console.log('new this.tankEval.pHDifference is '+this.tankEval.pHDifference)
    // console.log('new pHBlinkClass is '+this.pHBlinkClass)
    if(this.tankEval) {
       this.makeEvaluation();
    }
  
}  

  makeEvaluation(){
    console.log('this.volumeDifference is : '+ (this.volumeDifference))
    this.volumeOnPage = Math.round((this.tankEval.volume)*2)/2
    this.volumeDifference = this.tankEval.volume / this.tankEval.neededVolume;
    this.pHBlinkClass = isNaN(this.tankEval.pHDifference) ? 'noValue' : (this.tankEval.pHDifference < 0.3 ? 'goodValue': (this.tankEval.pHDifference < 0.5 ? 'blink1' : (this.tankEval.pHDifference < 1.5 ? 'blink2' : 'blink3')))
    this.dHBlinkClass = isNaN(this.tankEval.pHDifference)  ? 'noValue' : (this.tankEval.dHDifference < 1 ? 'goodValue': (this.tankEval.dHDifference < 3 ? 'blink1' : (this.tankEval.dHDifference < 5 ? 'blink2' : 'blink3')))
    this.tempBlinkClass = isNaN(this.tankEval.pHDifference)  ? 'noValue' : (this.tankEval.tempDifference < 0.5 ? 'goodValue': (this.tankEval.tempDifference < 2 ? 'blink1' : (this.tankEval.tempDifference < 4 ? 'blink2' : 'blink3')))
    this.volumeBlinkClass = (isNaN(this.volumeDifference) || this.volumeDifference ===Infinity) ? 'noValue' : (this.volumeDifference >= 1 ? 'goodValue': (this.volumeDifference> 0.85 ? 'blink1' : (this.volumeDifference > 0.6 ? 'blink2' : 'blink3'))) 
  } 

    openDialog(EvalValueType: string,EvalDifference: string,type:string, currentValue: number) {
    //    console.log('recommendedValue value is XXX' + this.tankEval[EvalDataType])
        this.dialog.open(TankParameterEvalDialog, {
          data: {
            recommendedValue: this.tankEval[EvalValueType],
              type: type,
              currentValue:currentValue,
              difference:  EvalDifference,
          },
        });
      }

    showEval() {
        console.log('tankEval is : '+JSON.stringify(this.tankEval));
        console.log('tank is : '+JSON.stringify(this.tank));
    }
  
}

@Injectable()
@Component({
    selector: 'tankParameter-dialog',
    templateUrl: './tankParameter-dialog.component.html', 
  })
  export class TankParameterEvalDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public recommendedValue: number, @Inject(MAT_DIALOG_DATA) public type: string,
    @Inject(MAT_DIALOG_DATA) public currentValue: number,@Inject(MAT_DIALOG_DATA) public difference: string, ) {
        // console.log('tankEval in dialogue is: '+ (this.data['tankEval']))
        // console.log('tankEval in dialogue is: '+ (this.data['tankEval'].TankId))
        // console.log('tankEval in dialogue is: '+ JSON.stringify(this.data ))
    //     console.log('type in dialogue is: '+ (this.type['type']))
    //  console.log('recommendedValue in dialogue is: '+ (this.recommendedValue['recommendedValue']))
    }
    
      
        isDatamatchingMessage:string;
  
    ngOnInit() {
   
    //    let difference:number;
    this.makeEvaluation();
      }
      
      makeEvaluation(){

        this.recommendedValue = Math.round((this.recommendedValue['recommendedValue'])*2)/2;
        this.type =  this.type['type'];
        this.difference =  this.difference['difference'];
       this.currentValue =  Math.round((this.currentValue['currentValue'])*2)/2;
        console.log('value in dialogue is: '+ this.currentValue )
        // console.log('difference in dialogue is XXX: '+ this.difference );
        //  this.difference = Math.abs( this.recommendedValue - this.currentValue);
     
      if(this.difference ===  'goodValue' ) {
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
              console.log('this.difference is:  '+ (this.difference))
      }

      ngOnChanges(){
       
            this.makeEvaluation();
          }

    }
  