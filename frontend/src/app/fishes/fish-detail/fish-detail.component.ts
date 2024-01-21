import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FishtankComponent } from "src/app/fishtank/fishtank.component";
import { DataStorageService } from "src/app/shared/data.storage.service";
import { Fish } from "src/app/shared/fish.model";
import { fishService } from "src/app/shared/fish.service";
import { Fishtank } from "src/app/shared/fishtank.model";
import { FishDetail, fishTankService } from "src/app/shared/fishtank.service";

 

@Component({
  selector: 'app-fish-detail',
  templateUrl: './fish-detail.component.html',
  styleUrls: ['./fish-detail.component.css']
  })
export class fishDetailComponent {
  fish: Fish;
  id: number;
  showEditForm: boolean;
  editMode: boolean;
  deleteConfirmation: boolean;
  fishForm: FormGroup;
  addFishMode: boolean;
  fishGroupList: FishDetail[]; 
  fishGroup: FishDetail = {"fishId":0,"count":0};
  fishCount: number;
  fishName:string; 
  fishListSubscription: Subscription;
  tank: Fishtank;
  foundElement: FishDetail;
  foundElementIndex: number;
  calmnessMessage: string;

  calmnessValues = [
    { id: 0, label: "Shy, delicate fish" },
    { id: 1, label: "Shy, less active fish" },
    { id: 2, label: "Neutral behaviour" },
    { id: 3, label: "Active fish" },
    { id: 4, label: "Aggresive and territorial" },
    { id: 5, label: "Predatory and piscivorous(fish eater)" },
    { id: 6, label: "Extremely aggresive" },
  ] 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fishService: fishService,
    private dataService: DataStorageService,
    private tankService: fishTankService,
    private baseComponent: FishtankComponent) {}
  
  ngOnInit() { 
    this.fishListSubscription = this.tankService.fishListSubject.subscribe(list => { 
    this.fishGroupList = list; 
    }) 
    this.route.params
    .subscribe(
      (params: Params) => {   
        if (params['id'] == 'new') {
          this.fish = new Fish('','',0,'',1,14,0,30,0,40,2,false)
        } else {
          this.id = +params['id']; 
          this.editMode = params['id'] != null;  
          this.fish = this.fishService.getFish(this.id) 
          this.addFishMode=false;
          this.deleteConfirmation=false;
          this.showEditForm=false; 
        }  
        if(this.fishGroupList) { 
          let foundGroup:FishDetail =  this.fishGroupList.find((el)=>{
             return el.fishId === this.id
          });
          if(foundGroup) { 
            this.fishGroup = foundGroup; 
            this.fishCount= foundGroup.count;
          } else { 
            this.fishCount = 0;
          } 
        } 
        this.calmnessMessage = this.calmnessValues[this.fish.calmness].label;
      }
    ) 
    this.tankService.tank.subscribe(tank => { 
      if (tank === null) { 
        return
      } else {
        this.tank=tank; 
      }
    }); 
    if(!this.tank) {
      this.fishCount = 0;
    } 
  }
  
  sendToFishesPage() {
    this.router.navigate([ '../'], {relativeTo: this.route})
  }

  onFishEdit() { 
    this.router.navigate([ 'edit'], {relativeTo: this.route})
  }
    
  onAddFishToTank() { 
    this.addFishMode = true; 
    let foundGroup:FishDetail = this.fishGroupList.find((el)=>{
      return el.fishId === this.id
    }); 
    this.foundElementIndex = this.fishGroupList.findIndex((el)=>{
      return el.fishId === this.id
    })
    this.fishGroup.fishId= this.id;
    if (foundGroup) { 
      this.fishGroup.count= foundGroup.count; 
      this.fishCount = this.fishGroup.count; 
    } else {
      this.fishGroup.count=0;
      this.fishCount = 0;
    } 
  } 

  onNotAddFishToTank() {
    this.addFishMode = false;
  }

  onCreateFishGroup() { 
    this.fishCount = this.fishGroup.count;  
    if(this.fishCount >0) {
      this.tankService.addFishes(this.fishGroup,this.foundElementIndex)
    } else {
      this.tankService.removeFishes(this.foundElementIndex) 
    } 
    this.dataService.saveTank(this.tank) 
    this.addFishMode = false; 
    setTimeout(()=> {
      this.baseComponent.ngOnInit();
    },900); 
  }  

  onDeletefish() {
    this.deleteConfirmation=true; 
  }

  deletefish() { 
    this.dataService.deleteFish(this.id);
    this.router.navigate(['/fishes'])
  }

  onDontDelete() {
    this.deleteConfirmation=false;
  } 
}
  