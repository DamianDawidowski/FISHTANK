import { Component,Inject,Injectable,Input,OnInit,ChangeDetectorRef  } from "@angular/core";
import { FishDetail, FishInTankDetail, fishTankService } from "src/app/shared/fishtank.service";
import { FishtankComponent, fishEval } from "../fishtank.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Fish } from "src/app/shared/fish.model";
import { fishIconDialog } from "./fishIcon-dialog/fishIcon-dialog.component";
import { fishNumberDialog } from "./fishNumber-dialog/fishNumber-dialog.component";
import { Subscription } from "rxjs";
import { DataStorageService } from "src/app/shared/data.storage.service";
import { Fishtank } from "src/app/shared/fishtank.model";
import { JsonPipe } from "@angular/common";





@Injectable()
@Component({
    selector:'app-fishlist-intank',
    templateUrl: './fishlist-intank.component.html',
    styleUrls: ['./fishlist-intank.component.css']
})
export class fishlistIntank implements OnInit{
// @Input () finalFishesInTank;
@Input () AllFishEval:fishEval[];
@Input () overcrowdedRatio: number;
@Input () tankName: string;
tankSubscription: Subscription;
fishEvalSubscription: Subscription;
fishesWithEvaluation =[];
tank: Fishtank;
finalFishesInTank;

constructor(private dialog: MatDialog,
    private changeDetection: ChangeDetectorRef,
    private tankService: fishTankService,
    private dataService: DataStorageService,
    private baseComponent: FishtankComponent) {}

ngOnInit(): void {
    this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
        // console.log('works AAA'  );
        this.finalFishesInTank = list;
        // console.log('finalFishesInTankSubject 222'+JSON.stringify(this.finalFishesInTank ));
         }
        );

    this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
        if (tank === null) { 
          return
        } else {
          
            this.tank=tank;
         // // console.log('tank 222'+JSON.stringify(this.tank ));
         }
        });
  
        // // console.log('first evaluation')

        this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
            this.finalFishesInTank = list;
             // // console.log('finalFishesInTankSubject 222'+JSON.stringify(list ));
             }
            );
     

    }


    public trackItem (index: number, fishs: any) {
        return fishs.id;
      }

      isNaN: Function = Number.isNaN;



    ngOnChanges(){
        this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
            this.finalFishesInTank = list;
             // // console.log('finalFishesInTankSubject 222'+JSON.stringify(list ));
             }
            );
        this.fishesWithEvaluation =[];
        // // // console.log('fishesWithEvaluation 22 '+JSON.stringify(this.fishesWithEvaluation))
        this.AllFishEval.forEach(fishEval => {
            this.finalFishesInTank.forEach(fish => {
                if(fishEval.FishId===fish.id) {
                    this.fishesWithEvaluation.push({...fishEval,...fish})
                }
                
            });
        
            // // // console.log('fishEval is : '+JSON.stringify(fishEval))
        });
        // // console.log('fishesWithEvaluation 33 '+JSON.stringify(this.fishesWithEvaluation))
        // // console.log('ngOnChanges' );
        this.changeDetection.detectChanges();

    }

    ngAfterViewInit() {
        this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
            this.finalFishesInTank = list;
             // // console.log('finalFishesInTankSubject 222'+JSON.stringify(list ));
             }
            );
        // // // console.log('1111 finalFishesInTank is :'+JSON.stringify(this.finalFishesInTank))
        // // console.log('changed');
        // this.fishesWithEvaluation =[];
        this.AllFishEval.forEach(fishEval => {
        
            // // // console.log('fishEval is : '+JSON.stringify(fishEval))
        }); 

        this.finalFishesInTank.forEach((fish) => {
            // // console.log('XXX fish is :'+ (fish))
        })
    }

    onSelectedFish(){
      console.log('this.fishesWithEvaluation'+JSON.stringify(this.fishesWithEvaluation));
        // // // console.log('overcrowdedRatio'+ (this.overcrowdedRatio));
//         // // console.log('this.finalFishesInTank'+JSON.stringify(this.finalFishesInTank));
//    // // console.log('fishesWithEvaluation'+JSON.stringify(this.fishesWithEvaluation));
//    // // console.log('overcrowdedRatio is: '+JSON.stringify(this.overcrowdedRatio))
    }



     adjustFish(fishGroup: FishDetail, foundElementIndex:number) {
        this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
            if (tank === null) { 
              return
            } else {
              
                this.tank=tank; 
             }
            });


        // // // console.log('this.tank 111: '+JSON.stringify(this.tank));
        if(fishGroup.count >0) {
                this.tankService.addFishes(fishGroup, foundElementIndex)
            } else  {
                this.tankService.removeFishes(foundElementIndex) 
            }
                
            // // // console.log('this.tank 222: '+JSON.stringify(this.tank));
            console.log('works 1')
             this.dataService.saveTank(this.tank);
             console.log('works 2')

             setTimeout(()=> {
                this.dataService.fetchTank(); 
               
             },200);

            // this.dataService.fetchTank(); 
         this.baseComponent.ngAfterContentInit();
            // this.dataService.fetchTank;
            // this.tankService.setTank(this.tank)
            // setTimeout(()=> {
            //     this.baseComponent.loadTank();
               
            //  },300);
            //  setTimeout(()=> {
            //     // // console.log(('2300'));
            //     this.dataService.fetchTank(); 
            //  },1000);
          
 
            //  setTimeout(()=> {
            //    // // console.log((' this.baseComponent.evaluateFishes()'));
            //    this.baseComponent.ngAfterContentInit();
            // },1600);
            // setTimeout(()=> {
            //     // // console.log(('5000 try'));
            //     this.baseComponent.ngAfterContentInit();
            //  },5000);

    }
   
















    openDialog1(fishName: string, type: string, valueDifference:number, lengthRatio?:number, depthRatio?:number, heightRatio?:number) {
   console.log('valueDifference is : '+valueDifference  )
            this.dialog.open(fishIconDialog, {
              data: {
               fishName: fishName,
                type: type,
                valueDifferenceOrProblemFishes:valueDifference,
                 lengthRatio:  lengthRatio,
                 depthRatio:  depthRatio,
                 heightRatio:  heightRatio,
                 tankName: this.tankName
              },
            });
          }

    openDialog2(fishName: string, type: string, conflictFishes: string[]) {
    // // console.log('works2'  );
    // // console.log('conflictFishes is:'+conflictFishes  );
        this.dialog.open(fishIconDialog, {
            data: {
                fishName: fishName,
                type: type,
                valueDifferenceOrProblemFishes:conflictFishes, 
                tankName: this.tankName
            },
        });
        }

    openFishNumberDialog(fishId: number, fishName:string, count: number) {
        // // console.log('openFishNumberDialog works2'  );
        // // // console.log('conflictFishes is:'+conflictFishes  );
        const dialogRef =  this.dialog.open(fishNumberDialog, {
                data: {
                    fishId:fishId,
                    fishName:fishName,
                    count:count
                },
            });
            dialogRef.afterClosed().subscribe(result => {
                if(result) {
                      console.log('The dialog was closed', result);
                console.log('Count is', result['foundGroup'].count);
                // this.myForm.setControl('animal', result);
                // this.myForm.controls.animal.setValue(result);

                // console.log('finalFishesInTank is:'+ JSON.stringify(this.finalFishesInTank));

                // this.finalFishesInTank[0].count=result['foundGroup'].count;
                console.log('finalFishesInTank is:'+ JSON.stringify(this.finalFishesInTank));  
                }
                this.adjustFish(result['foundGroup'],result['foundElementIndex'])

              });
            }
        
            closeDialog() {
                this.dialog.closeAll();
            }

}

  