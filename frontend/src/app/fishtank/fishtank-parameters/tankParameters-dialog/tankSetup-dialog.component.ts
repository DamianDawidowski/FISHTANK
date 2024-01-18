import { Component, Inject, Injectable, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Fishtank } from "src/app/shared/fishtank.model";



@Injectable()
@Component({
    selector: 'tankSetup-dialog',
    styleUrls: ['./tankSetup-dialog.component.css'],
    templateUrl: './tankSetup-dialog.component.html', 
  })
  export class TankSetupDialog  implements OnInit{
    constructor(@Inject(MAT_DIALOG_DATA) public username: string, @Inject(MAT_DIALOG_DATA) public tank: Fishtank,@Inject(MAT_DIALOG_DATA) public isTankSetup: boolean,
    @Inject(MAT_DIALOG_DATA) public foundTemperature: number,@Inject(MAT_DIALOG_DATA) public foundPH: number,
    @Inject(MAT_DIALOG_DATA) public foundDH: number,private dialogRef: MatDialogRef<TankSetupDialog> ) {
        // console.log('tankEval in dialogue is: '+ (this.data['tankEval']))
        // console.log('tankEval in dialogue is: '+ (this.data['tankEval'].TankId))
        // console.log('tankEval in dialogue is: '+ JSON.stringify(this.data ))
    //     console.log('type in dialogue is: '+ (this.type['type']))
    //  console.log('recommendedValue in dialogue is: '+ (this.recommendedValue['recommendedValue']))
    }
    
    tankForm: FormGroup;
    titleName:string;
    editWaterParams:boolean=false; 

    ngOnInit(): void {
      this.username =  this.username['username'];
      this.tank =  this.tank['tank'];
      this.isTankSetup =  this.isTankSetup['isTankSetup'];
      this.foundTemperature =  this.foundTemperature['foundTemperature'];
      this.foundPH =  this.foundPH['foundPH'];
      this.foundDH =  this.foundDH['foundDH'];
      // console.log('tankForm in dialogue is: '+  (this.tankForm ));
      // console.log('foundPH in dialogue is: '+  (this.foundPH ));
      // console.log('this.tank.fishesInTank.length is: '+  (this.tank.fishesInTank.length));
      if(this.tank) {
        this.titleName = this.tank.tankName;
        if(this.tank.fishesInTank.length !== 0) {
                this.editWaterParams = true;
              }

      }
     
      this.initForm();
    }

    private initForm() { 
      console.log('works 4')
        let tankName: String = this.username+"'s tank";
        let length: number;
        let height: number;
        let depth: number;
        let ph: number;
        let dh: number; 
        let temperature: number; 
        let fishesInTank: string[];
        
      
        if(this.isTankSetup && this.tank) {
          // console.log('active tank info into form') 
          tankName = this.tank.tankName;
          length = this.tank.length;
          height = this.tank.height;
          depth = this.tank.depth;
          ph = this.tank.ph;
          dh = this.tank.dh;
          temperature = this.tank.temperature; 
          // fishesInTank = this.tank.fishesInTank;

        } 

          this.tankForm = new FormGroup({
            // 'id': this.id,
            'tankName': new FormControl(tankName, [Validators.required, Validators.minLength(4)]),
            'length': new FormControl(length, [Validators.required,Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
            'height': new FormControl(height, [Validators.required,Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
            'depth': new FormControl(depth, [Validators.required,Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
            'ph': new FormControl(ph),
            'dh': new FormControl(dh),
            'temperature': new FormControl(temperature) 
     
          });

        }

        get tankName() {
          return this.tankForm.get('tankName');
        }

        onFindWaterParams() {
        this.tank.temperature = this.foundTemperature;
              this.tank.dh = this.foundDH;
              this.tank.ph = this.foundPH;
               this.initForm();

        }

      



    onShowWaterParamsForm() {
      console.log('editWaterParams'+this.editWaterParams)
      this.editWaterParams = true;
      console.log('editWaterParams'+this.editWaterParams)
    }

    onUpdateTank() {
      this.dialogRef.close({tankForm:this.tankForm})
    }
     onCloseDialog() {
      this.dialogRef.close();     
    }

  }