import { Component, Inject, Injectable, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { fishlistIntank } from "../fishlist-intank.component";
import { FishDetail, fishTankService } from "src/app/shared/fishtank.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { FishtankComponent } from "../../fishtank.component";

@Injectable()
@Component({
    selector: 'fishNumber-dialog',
    templateUrl: './fishNumber-dialog.component.html', 
    styleUrls: ['./fishNumber-dialog.component.css'] 
  })
export class fishNumberDialog implements OnInit{
  fishListSubscription: Subscription;
  fishGroupList: FishDetail[];
  foundGroup: FishDetail;
  numberForm: FormGroup;
  foundElementIndex: number; 

  constructor(private tankService: fishTankService, 
    @Inject(MAT_DIALOG_DATA) public fishId: number, @Inject(MAT_DIALOG_DATA) public fishName: number, 
    @Inject(MAT_DIALOG_DATA) public count: number, private dialogRef: MatDialogRef<fishNumberDialog>) {}
     
  ngOnInit(): void {
    this.fishName =  this.fishName['fishName'];
    this.count =  this.count['count'];
    this.fishId =  this.fishId['fishId'];  
    this.fishListSubscription = this.tankService.fishListSubject.subscribe(list => {
      this.fishGroupList = list; 
      this.foundGroup =  this.fishGroupList.find((el)=>{
        return el.fishId === this.fishId
      }); 
      this.foundElementIndex = this.fishGroupList.findIndex((el)=>{
        return el.fishId === this.fishId
      })  
    }) 
    this.initForm();
    } 

  onSubmit() {  
    this.foundGroup.count=this.count;
    this.dialogRef.close({foundGroup:this.foundGroup,foundElementIndex:this.foundElementIndex}) 
  };

  onDeletefish() {
    this.foundGroup.count=0;
    this.dialogRef.close({foundGroup:this.foundGroup,foundElementIndex:this.foundElementIndex})
  };

  private initForm() {  
    this.numberForm = new FormGroup({ 
      'count': new FormControl(this.count, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]), 
    }); 
  } 
}