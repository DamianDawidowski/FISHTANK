import { Subject } from "rxjs";
import { Fish } from "./fish.model";
import { Injectable, OnInit } from "@angular/core";
import { DataStorageService } from "./data.storage.service";
import { BehaviorSubject } from "rxjs"; 





@Injectable({providedIn: 'root'})
export class fishService implements OnInit{ 
    fishesChanges = new BehaviorSubject<Fish[]>(null);

    private fishes: Fish[] = [];

    // constructor(private dataService: DataStorageService) {
    //     // this.dataService.fetchFishes();
    // }   

    ngOnInit(): void {
    //  this.dataService.fetchFishes();
    }

    setFishes(fishes: Fish[]) {
        this.fishes = fishes;
        this.fishesChanges.next(this.fishes.slice());
  
    }

    getFishes() {
        return this.fishes.slice();
    }

    getFish(id: number) {
        return this.fishes.find(obj => {
            return obj.id === id
          })
    }

    updateFish(index: number, newFish: Fish) {
        // console.log('updateFish works1')
        // console.log('fish to update is:'+ JSON.stringify(newFish))
          console.log('  works1')
        let adjustedIndex = this.fishes.findIndex((fish) => {
            return index === fish.id;
        });
        this.fishes[adjustedIndex] = newFish;
        console.log('  works2')
        this.fishesChanges.next(this.fishes.slice());
        // console.log('updateFish works2')
        // console.log(JSON.stringify(this.fishes[index]))
       
    }

    addFish(fish: Fish) {
        this.fishes.push(fish);
        this.fishesChanges.next(this.fishes.slice())
    }


    deleteFish(id: number) {
       
        let fishIndexToDelete = this.fishes.findIndex(obj => {
            return obj.id === id
          })
          console.log('fish to delete :'+this.fishes[fishIndexToDelete].commonName)
        this.fishes.splice(fishIndexToDelete,1);
        this.fishesChanges.next(this.fishes.slice())
    }

}