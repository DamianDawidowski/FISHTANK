import { Component, Input } from "@angular/core";
import { Fish } from "src/app/shared/fish.model"; 

@Component({
    selector: 'app-fish-item',
    templateUrl: './fish-item.component.html',
    styleUrls: ['./fish-item.component.css']
})
export class FishItemComponent {
  @Input() fish: Fish; 
  index: any;  

  ngOnInit() { 
    this.index = this.fish.id; 
  }
 
  ngDoCheck() {
    this.index = this.fish.id;
  }
    
  ngAfterContentInit() {
    this.index = this.fish.id;
  } 
}