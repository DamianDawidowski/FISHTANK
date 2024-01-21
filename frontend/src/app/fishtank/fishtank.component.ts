import { Component,OnInit,OnDestroy, Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';
import { UserService } from '../auth/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { Fishtank } from '../shared/fishtank.model';
import { FishDetail, FishInTankDetail, fishTankService } from '../shared/fishtank.service';
import { fishService } from '../shared/fish.service';
import { Fish } from '../shared/fish.model';
import { Type } from '@angular/compiler'; 

export class fishEval{ 
  public FishId:number; 
  public FishName:string; 
  public isOvercrowded:boolean;
  public isNotinSchoolifSchooling:boolean;
  public hoManytoAddToSchool:number;
  public dangerOfEaten:boolean;
  public eatenByWhatFishes:string[];
  public isBullied:boolean;
  public bulliedByWhatFishes:string[];
  public isTempGood:boolean;
  public tempDiffFromGood:number;
  public isPHGood:boolean;
  public pHDiffFromGood:number;
  public isDHGood:boolean;
  public dHDiffFromGood:number;
  public lengthRatio:number;
  public depthRatio:number;
  public heightRatio:number;
  public finalEval:number;
  
  constructor(FishId:number,FishName:string,isNotinSchoolifSchooling:boolean,hoManytoAddToSchool:number,dangerOfEaten:boolean,eatenByWhatFishes:string[], isBullied:boolean, 
    bulliedByWhatFishes:string[],lengthRatio:number, depthRatio:number, heightRatio:number, finalEval:number, isTempGood?:boolean,tempDiffFromGood?:number,isPHGood?:boolean,pHDiffFromGood?:number,isDHGood?:boolean,dHDiffFromGood?:number) {
      this.FishId=FishId; 
      this.FishName=FishName;
      this.isNotinSchoolifSchooling=isNotinSchoolifSchooling;
      this.hoManytoAddToSchool=hoManytoAddToSchool;
      this.dangerOfEaten=dangerOfEaten;
      this.eatenByWhatFishes=eatenByWhatFishes;
      this.isBullied=isBullied;
      this.bulliedByWhatFishes=bulliedByWhatFishes;
      this.isTempGood=isTempGood;
      this.tempDiffFromGood=tempDiffFromGood;
      this.isPHGood=isPHGood;
      this.pHDiffFromGood=pHDiffFromGood;
      this.isDHGood=isDHGood;
      this.dHDiffFromGood=dHDiffFromGood;
      this.lengthRatio = lengthRatio;
      this.depthRatio = depthRatio;
      this.heightRatio = heightRatio;
      this.finalEval=finalEval;  
  } 
}

export class tankEval{

  public TankId:number;
  public volume:number;
  public neededVolume:number; 
  public isTempGood:boolean;
  public tempDifference:number;
  public recommendedTemp:number; 
  public isPHGood:boolean;
  public pHDifference:number;
  public recommendedPH:number; 
  public isDHGood:boolean;
  public dHDifference:number;
  public recommendedDH:number; 
  public finalEval:number;  

  constructor(TankId:number, volume:number, neededVolume:number, tempDifference:number, recommendedTemp:number, pHDifference:number,
      recommendedPH:number, dHDifference:number, recommendedDH:number, finalEval:number,isTempGood:boolean, isPHGood:boolean,isDHGood:boolean){
      this.TankId=TankId;
      this.volume=volume;
      this.neededVolume=neededVolume;
      this.tempDifference=tempDifference;
      this.recommendedTemp=recommendedTemp;
      this.pHDifference=pHDifference;
      this.recommendedPH=recommendedPH;
      this.dHDifference=dHDifference;
      this.recommendedDH=recommendedDH;
      this.finalEval=finalEval;  
      this.isTempGood=isTempGood; 
      this.isPHGood=isPHGood; 
      this.isDHGood=isDHGood; 
  }
}
 
@Component({
  selector: 'app-fishtank',
  templateUrl: './fishtank.component.html',
  styleUrls: ['./fishtank.component.css']
})
export class FishtankComponent implements OnInit, OnDestroy{ 
  tankSubscription: Subscription; 
  fishListSubscription: Subscription;
  fishDesciptionSubscription: Subscription;
  fishDetail:FishDetail;
  fishDetailList: FishDetail[];
  user: User;
  tank: Fishtank; 
  sortedFishes: Fish[] = [];
  fishes: Fish[] = [];
  finalFishesInTank = [];
  finalFishesInTankSubject = new BehaviorSubject<Array<any>>([]); 
  AllFishEval:fishEval[] =[];
  tankEval: tankEval;
  tankScore:number = 0; 
  overcrowdedRatio:number; 
  testvalue:number=0;


  constructor(private fishService: fishService,
    private tankService: fishTankService,
    private dataService: DataStorageService,
    private userService: UserService,) {} 
 
  ngOnInit() {   
    this.dataService.fetchFishes();
    this.dataService.fetchTank(); 
    this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
      if (tank === null) { 
        return
      } else {
        this.tank=tank; 
      }
    }); 
    this.fishDesciptionSubscription =  this.fishService.fishesChanges
    .subscribe(
      (fishes: Fish[]) => { 
        if(fishes){ 
          this.sortedFishes = fishes.sort(function(a, b) { 
          return a.id - b.id;
        })
          this.fishes = fishes;
        } 
    });  
    if(this.tank) { 
      this.fishListSubscription = this.tankService.fishListSubject.subscribe(  fishDetail => {  
        this.fishDetailList = fishDetail;  
      }); 
      this.fishDesciptionSubscription = this.fishService.fishesChanges
      .subscribe(
      (fishes: Fish[]) => { 
        this.sortedFishes = fishes.sort(function(a, b) { 
          return a.id - b.id;
        })
        this.fishes = fishes;
      });  
    }  
  }
 
     

  ngOnChanges () {  
    this.dataService.fetchTank(); 
    this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
      if (tank === null) { 
        return
      } else {
        this.tank=tank;  
      }
    }); 
  } 

  ngAfterContentInit() { 
    this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
      if (tank === null) {  
        return
      } else {
        this.tank=tank;  
      }
    });  
    setTimeout(() => { 
      if(this.tank) { 
        this.createfinalFishesInTankList()
        this.evaluateFishes(); 
        this.evaluateTank(); 
      } 
    }, 300); 
  }
 
  loadTank(){
    this.dataService.fetchTank(); 
  }

  createfinalFishesInTankList(){
    this.finalFishesInTank = []; 
    if(!this.fishDetailList) { 
      this.fishListSubscription = this.tankService.fishListSubject.subscribe(  fishDetail => {   
        this.fishDetailList = fishDetail; 
      });
    }
    if(!this.sortedFishes || this.sortedFishes.length ===0) {
      this.fishDesciptionSubscription =  this.fishService.fishesChanges
      .subscribe(
        (fishes: Fish[]) => { 
          this.sortedFishes = fishes.sort(function(a, b) { 
            return a.id - b.id;
          })
          this.fishes = fishes;
        });  
    } 
    this.fishDetailList.forEach((fishDetail)=> { 
      this.sortedFishes.forEach((fish) => { 
        if (fishDetail.fishId === fish.id) { 
          let newFishInTank = {...fish, ...fishDetail};
          if(newFishInTank.count>0) {
            this.finalFishesInTank.push(newFishInTank)
          } 
        }
      })
    })  
    this.testvalue = 0;
    this.finalFishesInTankSubject.next(this.finalFishesInTank); 
  }


  evaluateFishes() {
    this.AllFishEval = []; 
    this.finalFishesInTank.forEach((fish) => { 
      let finalEval =0;
      let isNotinSchoolifSchooling:boolean; 
      if(fish.schooling) {
        if(fish.count <5) {
          finalEval+=2;
          isNotinSchoolifSchooling=true;
        }
      }

      let hoManytoAddToSchool:number = null;
      if(fish.schooling && fish.count <5){
        hoManytoAddToSchool = 5-fish.count;
      }

      let lengthRatio:number =this.tank.length/fish.commonLength;
      let depthRatio:number =this.tank.depth/fish.commonLength;
      let heightRatio:number=this.tank.height/fish.commonLength;
      if(lengthRatio<2) {
        finalEval+=10;
      } else if (lengthRatio<4) {
        finalEval+=5;
      }
      if(depthRatio<1) {
        finalEval+=10;
      } else if (depthRatio<1.5) {
        finalEval+=5;
      }
      if(heightRatio<1) {
        finalEval+=10;
      } else if (heightRatio<1.5) {
        finalEval+=5;
      }

      let namesOfPredatorsInTank:string[] =[];
      let dangerOfEaten:boolean = false;
      let isBullied:boolean = false; 
      let namesOfBulliesInTank:string[] =[]; 
  
      this.finalFishesInTank.forEach((otherFish) => {
        if((otherFish.commonLength>(fish.commonLength*3))&& otherFish.calmness>3)  { 
          dangerOfEaten = true;
          namesOfPredatorsInTank.push(otherFish.commonName);
          finalEval+=5;
        } 
        if(fish.calmness<2 && otherFish.calmness>2) {
          finalEval++;
          isBullied=true;
          namesOfBulliesInTank.push(otherFish.commonName)
        } 
      })

      let isTempGood:boolean = false;
      let tempDiffFromGood = 0;
      if (this.tank.temperature>=fish.tempMin-0.26 && this.tank.temperature<=fish.tempMax+0.26) {
        isTempGood=true;  
      } else {
        if (this.tank.temperature<fish.tempMin) {
          tempDiffFromGood = this.tank.temperature-fish.tempMin;
        } else {
          tempDiffFromGood = this.tank.temperature-fish.tempMax;
        };  
        finalEval+= Math.abs(tempDiffFromGood);
      } 

      let isPHGood:boolean = false;
      let pHDiffFromGood = 0; 
      if (this.tank.ph>=fish.phMin-0.26 && this.tank.ph<=fish.phMax+0.26) { 
        isPHGood=true;  
      } else {
        if (this.tank.ph<fish.phMin) { 
          pHDiffFromGood = this.tank.ph-fish.phMin;
        } else { 
          pHDiffFromGood = this.tank.ph-fish.phMax;
        }  
        finalEval+= Math.abs(pHDiffFromGood);
      } 

      let isDHGood:boolean = false;
      let dHDiffFromGood = 0;
      if (this.tank.dh>=fish.dhMin-0.26 && this.tank.dh<=fish.dhMax+0.26) {
        isDHGood=true;  
      } else {
        if (this.tank.dh<fish.dhMin) {
          dHDiffFromGood = this.tank.dh-fish.dhMin;
        } else {
          dHDiffFromGood = this.tank.dh-fish.dhMax;
        }  
        finalEval+= Math.abs(dHDiffFromGood);
      }  
      let evaluation = new fishEval(fish.id,fish.commonName,isNotinSchoolifSchooling,hoManytoAddToSchool,
        dangerOfEaten,namesOfPredatorsInTank,isBullied,namesOfBulliesInTank,lengthRatio,depthRatio,heightRatio,finalEval, isTempGood,tempDiffFromGood,isPHGood,pHDiffFromGood,isDHGood,dHDiffFromGood)
        this.AllFishEval.push(evaluation)   
    })  
  }

      evaluateTank() { 
        if(!this.tank) { 
          this.dataService.fetchTank(); 
          this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
           if (tank === null) { 
             return
           } else {
             this.tank=tank; 
           }
           }); 
        }
 
        let id:number = this.tank.id;
        let volume:number = (this.tank.length * this.tank.height * this.tank.depth)/1000;
        let neededVolume: number = 0; 
        let TempSum:number=0; 
        let pHSum:number=0; 
        let dHSum:number=0;
        let count:number=0; 
        let isTempGood:boolean=true; 
        let tempDifference: number=0; 
        let isPHGood:boolean=true; 
        let pHDifference: number=0; 
        let isDHGood:boolean=true; 
        let dHDifference: number=0; 
        let finalEval:number=0;   
        let recommendedTemp:number;
        let recommendedPH:number;
        let recommendedDH:number; 
        this.finalFishesInTank.forEach((fish) => {
          count++;
          neededVolume+=fish.commonLength*fish.count; 
          TempSum+=fish.tempMin+fish.tempMax;
          pHSum+=fish.phMin+fish.phMax;
          dHSum+=fish.dhMin+fish.dhMax;

         if(this.tank.temperature<fish.tempMin || this.tank.temperature>fish.tempMax) {
          isTempGood=false;
          finalEval += this.tank.temperature<fish.tempMin ? (fish.tempMin-this.tank.temperature)/2 : (this.tank.temperature - fish.tempMax)/2;
         }

         if(this.tank.ph<fish.phMin || this.tank.ph>fish.phMax) {
          isPHGood=false; 
          finalEval += this.tank.ph<fish.phMin ? (fish.phMin-this.tank.ph)*2 : (this.tank.ph - fish.phMax)*2; 
         } 
         if(this.tank.dh<fish.dhMin || this.tank.dh>fish.dhMax) {
          isDHGood=false;
          finalEval += this.tank.dh<fish.dhMin ? (fish.dhMin-this.tank.dh) : (this.tank.dh - fish.dhMax);
         } 
         recommendedTemp = TempSum/(count*2);
         recommendedPH = pHSum/(count*2);
         recommendedDH = dHSum/(count*2);
         this.overcrowdedRatio = neededVolume/volume; 
         if(fish.commonLength>this.tank.length/2 || fish.commonLength>this.tank.depth || fish.commonLength>this.tank.height) {
          finalEval+=10;
         } else if(fish.commonLength>this.tank.length/4 || fish.commonLength>this.tank.depth/1.5 || fish.commonLength>this.tank.height/1.5) {
          finalEval+=4;
         }  
       }) 

       tempDifference = Math.abs(this.tank.temperature - recommendedTemp);
       pHDifference = Math.abs(this.tank.ph - recommendedPH);
       dHDifference = Math.abs(this.tank.dh - recommendedDH); 
       if(neededVolume>volume) { 
          finalEval += ((neededVolume/volume)-1)*10;
       } else if ((volume/neededVolume)>=5) { 
        finalEval -=5;
       } else { 
        finalEval+= -(volume/neededVolume)
       } 
       this.tankEval = new tankEval(id,volume,neededVolume,tempDifference,recommendedTemp,pHDifference,recommendedPH,dHDifference,recommendedDH,finalEval,isTempGood,isPHGood,isDHGood);
       this.tankScore = finalEval;
       } 
   
  ngOnDestroy() {
    this.finalFishesInTank=[]; 
    this.tankSubscription.unsubscribe;
    if(this.fishListSubscription) {
      this.fishListSubscription.unsubscribe;
    } 
    if(this.fishDesciptionSubscription) {
      this.fishDesciptionSubscription.unsubscribe;
    } 
  }
}
 