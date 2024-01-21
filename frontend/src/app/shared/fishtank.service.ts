import { Injectable, OnInit } from "@angular/core"; 
import { Fishtank } from "./fishtank.model";
import { BehaviorSubject } from "rxjs";   

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
export class fishTankService {  
  tank = new BehaviorSubject<Fishtank>(null);
  private currentTank: Fishtank; 
  fishListSubject = new BehaviorSubject<FishDetail[]>(null);
  fishList:FishDetail[] =[];;
  fish: FishDetail;  

  createTank(tank: Fishtank) { 
    this.currentTank=tank;
    this.tank.next(tank);
  }

  deleteTank() { 
    this.currentTank=null;
    this.tank.next(null);
  } 

  setTank(tank: Fishtank, id?: number) { 
    this.currentTank=tank;
    this.tank.next(tank); 
    if(tank){
      let fishStringList:string[] = tank.fishesInTank; 
      this.fishList = []; 
      if (fishStringList) { 
        fishStringList.forEach((fish) =>{ 
        this.fishList.push(JSON.parse(fish)) 
      })
      }  
      this.fishListSubject.next(this.fishList)
    } 
  }
 
  getTank(id: number) {
    if (this.currentTank.id === id) {
      return this.currentTank;
    }
    return null;
  } 

  addFishes(fishGroup: FishDetail, id?: number) { 
    if (this.currentTank.fishesInTank === undefined || this.currentTank.fishesInTank === null) {
      this.currentTank.fishesInTank = []; 
    } 
    let fishString: string = JSON.stringify(fishGroup)
    if(id>=0) { 
      this.currentTank.fishesInTank[id]= fishString; 
    } else {
      this.currentTank.fishesInTank.push(fishString); 
    } 
    this.tank.next(this.currentTank); 
  }

  removeFishes(id:number) {
    this.currentTank.fishesInTank.splice(id,1);
    this.tank.next(this.currentTank); 
  } 
}