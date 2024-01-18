import { Component, Input } from "@angular/core";
import { Fish } from "src/app/shared/fish.model";



@Component({
    selector: 'app-fish-item',
    templateUrl: './fish-item.component.html',
    styleUrls: ['./fish-item.component.css']
  })
  export class FishItemComponent {
    constructor( ) {}
    // @Input() 
    index: any;
    
    @Input() fish: Fish;

    ngOnInit() {
      // console.log('this.fish is : ' + this.fish );
      // console.log('this.fish.id is : '+this.fish.id)
   this.index = this.fish.id;


    }


    ngDoCheck() {
      this.index = this.fish.id;
    }
    
    ngAfterContentInit() {
      this.index = this.fish.id;
    }


  }