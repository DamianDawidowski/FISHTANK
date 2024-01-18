import { Subject } from "rxjs";
import { Fish } from "./fish.model";
import { Injectable, OnInit } from "@angular/core";
import { DataStorageService } from "./data.storage.service";
import { Fishtank } from "./fishtank.model";
import { BehaviorSubject } from "rxjs"; 
import { fishDetailComponent } from "../fishes/fish-detail/fish-detail.component";
import { FishtankComponent } from "../fishtank/fishtank.component";


export interface FishInTankDetail {
    fishId: number;
    count: number;  
     commonName: String;
     latinName: String;
    commonLength: number;
      pictureLink: String;
    phMin: number;
      phMax: number;
      dhMin: number;
      dhMax: number;
      tempMin: number;
      tempMax: number; 
      schooling: boolean;
       calmness: number;
  }







export interface FishDetail {
    fishId: number;
    count: number; 
  }


@Injectable({providedIn: 'root'})
export class fishTankService implements OnInit{ 

    tank = new BehaviorSubject<Fishtank>(null);
    private currentTank: Fishtank;

    fishListSubject = new BehaviorSubject<FishDetail[]>(null);
    fishList:FishDetail[] =[];;
    fish: FishDetail;

    // constructor(private dataService: DataStorageService) {
    //     // this.dataService.fetchFishes();
    // }   

    ngOnInit(): void {
    //  this.dataService.fetchFishes();



    }

    createTank(tank: Fishtank) {
        
        this.currentTank=tank;
        this.tank.next(tank);
    }

    deleteTank() { 
        this.currentTank=null;
        this.tank.next(null);
    }






    setTank(tank: Fishtank, id?: number) {
      // console.log('works 111')
       
       
    // tank['tankId']=id;
        this.currentTank=tank;
        this.tank.next(tank);
      // console.log('set Tank is: '+JSON.stringify(this.currentTank))

      if(tank){
             let fishStringList:string[] = tank.fishesInTank;
    
    this.fishList = [];

    if (fishStringList) {

        fishStringList.forEach((fish) =>{
            
        
        // // console.log('fish data is: '+ fish)
        this.fishList.push(JSON.parse(fish))
    

      
        // // console.log('fish data is: '+ (JSON.parse(fish)).fishId)
    })
    }
     
    // this.fishList.forEach((fish) =>{
    //     // console.log('fishId is: '+ fish.fishId+' and the count is: '+ fish.count) 
     
    // })
     
    this.fishListSubject.next(this.fishList)
      }
    

    
    // getFishes() {
    //     return this.fishes.slice();
    // }

    
    }



    getTank(id: number) {
        if (this.currentTank.id === id) {
        return this.currentTank;
          }
          return null;
    }




    addFishes(fishGroup: FishDetail, id?: number) {
        // // console.log('set Tank is: '+JSON.stringify(this.currentTank))
        if (this.currentTank.fishesInTank === undefined || this.currentTank.fishesInTank === null) {
            this.currentTank.fishesInTank = [];
            // // console.log('set Tank is AAA: '+JSON.stringify(this.currentTank))
        }
        // let fishToAdd: FishDetail = { fishId: id,
        //     count: count };
        // fishToAdd.fishId = id;
        // fishToAdd.count = count;
        let fishString: string = JSON.stringify(fishGroup)
        if(id>=0) {
            // // console.log('changed fish is: '+fishString)
            this.currentTank.fishesInTank[id]= fishString; 
        } else {
            this.currentTank.fishesInTank.push(fishString);
            // // console.log('pushed fish is: '+fishString)
        }
       
        this.tank.next(this.currentTank);
        
        // this.fishListSubject.next(this.fishList)
    }

    removeFishes(id:number) {
        this.currentTank.fishesInTank.splice(id,1);
        this.tank.next(this.currentTank);
        // this.fishListSubject.next(this.fishList)
    }





    // updateFish(index: number, newFish: Fish) {
    //     // // console.log('updateFish works1')
    //     // // console.log('fish to update is:'+ JSON.stringify(newFish))
    //     let adjustedIndex = index -1;
    //     this.fishes[adjustedIndex] = newFish;
    //     this.fishesChanges.next(this.fishes.slice());
    //     // // console.log('updateFish works2')
    //     // // console.log(JSON.stringify(this.fishes[index]))
       
    // }

    // addFish(fish: Fish) {
    //     this.fishes.push(fish);
    //     this.fishesChanges.next(this.fishes.slice())
    // }


    // deleteFish(id: number) {
       
    //     let fishIndexToDelete = this.fishes.findIndex(obj => {
    //         return obj.id === id
    //       })
    //       // console.log('fish to delete :'+this.fishes[fishIndexToDelete].commonName)
    //     this.fishes.splice(fishIndexToDelete,1);
    //     this.fishesChanges.next(this.fishes.slice())
    // }

}