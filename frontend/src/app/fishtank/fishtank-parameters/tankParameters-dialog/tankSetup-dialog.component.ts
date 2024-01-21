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
  constructor(@Inject(MAT_DIALOG_DATA) public username: string, @Inject(MAT_DIALOG_DATA) public tank: Fishtank,
    @Inject(MAT_DIALOG_DATA) public isTankSetup: boolean, @Inject(MAT_DIALOG_DATA) public foundTemperature: number,
    @Inject(MAT_DIALOG_DATA) public foundPH: number, @Inject(MAT_DIALOG_DATA) public foundDH: number,
    private dialogRef: MatDialogRef<TankSetupDialog>) {}
  
  tankForm: FormGroup;
  titleName:string;
  editWaterParams:boolean=false; 

  ngOnInit(): void {
    this.username =  this.username['username'];
    this.tank = this.tank['tank'];
    this.isTankSetup = this.isTankSetup['isTankSetup'];
    this.foundTemperature = this.foundTemperature['foundTemperature'];
    this.foundPH = this.foundPH['foundPH'];
    this.foundDH = this.foundDH['foundDH']; 
    if(this.tank) {
      this.titleName = this.tank.tankName;
      if(this.tank.fishesInTank.length !== 0) {
          this.editWaterParams = true;
      } 
    } 
    this.initForm();
  }

  private initForm() {  
    let tankName: String = this.username+"'s tank";
    let length: number;
    let height: number;
    let depth: number;
    let ph: number;
    let dh: number; 
    let temperature: number; 
    let fishesInTank: string[];
       
    if(this.isTankSetup && this.tank) { 
      tankName = this.tank.tankName;
      length = this.tank.length;
      height = this.tank.height;
      depth = this.tank.depth;
      ph = this.tank.ph;
      dh = this.tank.dh;
      temperature = this.tank.temperature;  
    } 

    this.tankForm = new FormGroup({ 
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
    this.editWaterParams = true; 
  }

  onUpdateTank() {
    this.dialogRef.close({tankForm:this.tankForm})
  }

  onCloseDialog() {
    this.dialogRef.close();     
  }  
}