import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
      private router: Router,
      private route: ActivatedRoute,
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



           
            });

             
            // for (let fish in fishes) {
            //   console.log('loaded fish is: '+JSON.stringify(fish))
            // }
 
        
        //  this.fishes = this.fishService.getFishes();
        
         }

        //  ngOnChanges() {
        //   console.log('fetched')
        //   this.dataService.fetchFishes();
        //  }

         toStart() {
          
         }

         ngOnDestroy() {
            this.subscription.unsubscribe;
          }

}