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
    constructor(private fishlistIntank: fishlistIntank, private tankService: fishTankService, private router: Router,private baseComponent: FishtankComponent,
      @Inject(MAT_DIALOG_DATA) public fishId: number, @Inject(MAT_DIALOG_DATA) public fishName: number, @Inject(MAT_DIALOG_DATA) public count: number,
      private dialogRef: MatDialogRef<fishNumberDialog>) {
        console.log('FishId in dialogue is: '+ (this.fishId['fishId']))
        console.log('count in dialogue is: '+ (this.count['count'])) 
        this.fishName =  this.fishName['fishName'];
        this.count =  this.count['count'];
        this.fishId =  this.fishId['fishId'];
        // console.log('tankEval in dialogue is: '+ JSON.stringify(this.data ))
    //     console.log('type in dialogue is: '+ (this.type['type']))
    //  console.log('recommendedValue in dialogue is: '+ (this.recommendedValue['recommendedValue']))
    }
    fishListSubscription: Subscription;
    fishGroupList: FishDetail[];
    foundGroup: FishDetail;
    numberForm: FormGroup;
    foundElementIndex: number;

    ngOnInit(): void {

      this.fishListSubscription = this.tankService.fishListSubject.subscribe(list => {
        console.log('worksXXX' )
        this.fishGroupList = list;


        // console.log('list is:'+JSON.stringify(list))
        // console.log('this.fishId:'+this.fishId)


      this.foundGroup =  this.fishGroupList.find((el)=>{
          return el.fishId === this.fishId
         });
        
          this.foundElementIndex = this.fishGroupList.findIndex((el)=>{
            return el.fishId === this.fishId
           }) 
           if(this.foundGroup) {
             console.log('foundGroup is:'+this.foundGroup.fishId)
           }
          
      })
     

        this.initForm();
    }




    onSubmit() {
    //  this.router.navigate(['/fishes'])
    // this.baseComponent.show();

      this.foundGroup.count=this.count;
      this.dialogRef.close({foundGroup:this.foundGroup,foundElementIndex:this.foundElementIndex})

      // this.baseComponent.setCount(this.count)
      // this.fishlistIntank.adjustFish(this.foundGroup, this.foundElementIndex);
      // this.fishlistIntank.closeDialog();
    //   setTimeout(()=> {
    //     // // console.log(('2300'));
    //     this.router.navigate(['/fishtank'])
    //  },1000);
    // 
      
    };
    onDeletefish() {
      this.foundGroup.count=0;
      this.dialogRef.close({foundGroup:this.foundGroup,foundElementIndex:this.foundElementIndex})
    };

    private initForm() { 
        
        // let tankName: String;
         
          this.numberForm = new FormGroup({
            // 'id': this.id,
            'count': new FormControl(this.count, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]),
     
          });

        }


}