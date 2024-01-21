import { Fish } from "./fish.model";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs"; 


@Injectable({providedIn: 'root'})
export class fishService{ 
    fishesChanges = new BehaviorSubject<Fish[]>(null);
    private fishes: Fish[] = [];

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
        let adjustedIndex = this.fishes.findIndex((fish) => {
            return index === fish.id;
        });
        this.fishes[adjustedIndex] = newFish; 
        this.fishesChanges.next(this.fishes.slice());  
    }

    addFish(fish: Fish) {
        this.fishes.push(fish);
        this.fishesChanges.next(this.fishes.slice())
    }
 
    deleteFish(id: number) { 
        let fishIndexToDelete = this.fishes.findIndex(obj => {
            return obj.id === id
          }) 
        this.fishes.splice(fishIndexToDelete,1);
        this.fishesChanges.next(this.fishes.slice())
    } 
}