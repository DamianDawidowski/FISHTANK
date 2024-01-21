import { Component,Inject,Injectable,Input,OnInit,ChangeDetectorRef  } from "@angular/core";
import { FishDetail, FishInTankDetail, fishTankService } from "src/app/shared/fishtank.service";
import { FishtankComponent, fishEval } from "../fishtank.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog"; 
import { fishIconDialog } from "./fishIcon-dialog/fishIcon-dialog.component";
import { fishNumberDialog } from "./fishNumber-dialog/fishNumber-dialog.component";
import { Subscription } from "rxjs";
import { DataStorageService } from "src/app/shared/data.storage.service";
import { Fishtank } from "src/app/shared/fishtank.model";  

@Injectable()
@Component({
    selector:'app-fishlist-intank',
    templateUrl: './fishlist-intank.component.html',
    styleUrls: ['./fishlist-intank.component.css']
})
export class fishlistIntank implements OnInit{ 
    @Input () AllFishEval:fishEval[];
    @Input () overcrowdedRatio: number;
    @Input () tankName: string;
    tankSubscription: Subscription;
    fishEvalSubscription: Subscription;
    fishesWithEvaluation =[];
    tank: Fishtank;
    finalFishesInTank;
    isNaN: Function = Number.isNaN;

    constructor(private dialog: MatDialog,
        private changeDetection: ChangeDetectorRef,
        private tankService: fishTankService,
        private dataService: DataStorageService,
        private baseComponent: FishtankComponent) {}

    ngOnInit(): void {
        this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => {  
            this.finalFishesInTank = list; 
        }); 
        this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
            if (tank === null) { 
                return;
            } else { 
                this.tank=tank; 
            }
        }); 
        this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
            this.finalFishesInTank = list; 
        }); 
    }
 
    public trackItem (index: number, fishs: any) {
        return fishs.id;
      }
 
    ngOnChanges(){
        this.fishEvalSubscription = this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
            this.finalFishesInTank = list; 
        });
        this.fishesWithEvaluation =[]; 
        this.AllFishEval.forEach(fishEval => {
            this.finalFishesInTank.forEach(fish => {
                if(fishEval.FishId===fish.id) {
                    this.fishesWithEvaluation.push({...fishEval,...fish})
                } 
            }); 
        }); 
        this.changeDetection.detectChanges(); 
    }

    ngAfterViewInit() {
        this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
            this.finalFishesInTank = list; 
        });  
    }
 
    adjustFish(fishGroup: FishDetail, foundElementIndex:number) {
        this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
            if (tank === null) { 
              return
            } else { 
                this.tank=tank; 
            }
        }); 
        if(fishGroup.count >0) {
            this.tankService.addFishes(fishGroup, foundElementIndex)
        } else {
            this.tankService.removeFishes(foundElementIndex) 
        } 
        this.dataService.saveTank(this.tank); 
        setTimeout(()=> {
            this.dataService.fetchTank();  
        },200); 
        this.baseComponent.ngAfterContentInit(); 
    }
    
    openDialog1(fishName: string, type: string, valueDifference:number, lengthRatio?:number, depthRatio?:number, heightRatio?:number) {
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
        const dialogRef =  this.dialog.open(fishNumberDialog, {
            data: {
                fishId:fishId,
                fishName:fishName,
                count:count
            },
        });
        dialogRef.afterClosed().subscribe(result => { 
            if(result) {
                this.adjustFish(result['foundGroup'],result['foundElementIndex'])  
            }
        });
    }
        
    closeDialog() {
        this.dialog.closeAll();
    } 
}

  