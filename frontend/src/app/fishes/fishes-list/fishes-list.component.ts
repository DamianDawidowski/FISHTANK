import { Component, Input, OnDestroy, OnInit } from "@angular/core"; 
import { Subscription } from "rxjs";
import { DataStorageService } from "src/app/shared/data.storage.service";
import { Fish } from "src/app/shared/fish.model";
import { fishService } from "src/app/shared/fish.service";
 
@Component({
    selector: 'app-fishes-list',
    templateUrl: './fishes-list.component.html',
    styleUrls:['./fishes-list.component.css']
})
export class FishesListCOmponent implements OnInit, OnDestroy{
   @Input() fishes: Fish[] = [];
    sortedFishes: Fish[] = []; 
    subscription: Subscription;

    constructor(private fishService: fishService, 
      private dataService: DataStorageService) {} 

    ngOnInit() {
      this.dataService.fetchFishes(); 
      this.subscription =  this.fishService.fishesChanges
        .subscribe(
          (fishes: Fish[]) => { 
          if (fishes) { 
            this.sortedFishes = fishes.sort(function(a, b) { 
            return a.id - b.id;
          })
          this.fishes = fishes; 
          } 
          }
        ); 
    } 
    
    ngOnDestroy() {
      this.subscription.unsubscribe;
    } 
}