import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { BehaviorSubject, Subscription } from "rxjs";
import { fishService } from '../shared/fish.service';
import { DataStorageService } from '../shared/data.storage.service';
import { Fish } from '../shared/fish.model';
import { fishTankService } from '../shared/fishtank.service';

@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css']
})
export class FishesComponent {
  openModalCheck = false;
  subscription: Subscription;
  fishes: Fish[] = [];
  sortedFishes: Fish[] = [];

  // openModalCheck = new BehaviorSubject<boolean>(false);
 constructor(private fishService: fishService,
  private dataService: DataStorageService,
  private router: Router,
  private tankService: fishTankService) {}

 ngOnInit() {
  console.log('works1')
  this.dataService.fetchFishes();
   this.dataService.fetchTank();

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
   } 


   ngAfterContentInit() {
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

   }




  openModal() {
    // this.modalRef = this.modalService.open(ModalComponent)
  }

  toStart() {
    console.log('start works')
    this.router.navigate(['new'])
  } 
   
  showSortedFishes() {
console.log('this.sortedFishes is : '+JSON.stringify(this.sortedFishes))
console.log('this.fishes is : '+JSON.stringify(this.fishes))
  }

}
