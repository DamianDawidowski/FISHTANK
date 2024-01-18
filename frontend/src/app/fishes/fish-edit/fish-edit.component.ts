import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DataStorageService } from "src/app/shared/data.storage.service";
import { Fish } from "src/app/shared/fish.model";
import { fishService } from "src/app/shared/fish.service"; 


@Component({
    selector: 'app-fish-edit',
    templateUrl: './fish-edit.component.html',
    styleUrls: ['./fish-edit.component.css']
  })
  export class fishEditComponent {
   updatedFish: Fish;
   id: number;
   showEditForm: boolean;
   editMode: boolean;
   deleteConfirmation: boolean;
   fishForm: FormGroup;
   schooling: boolean = false;
    calmness: number = 0;
   
    constructor(
        // private ingredientService: ingredientService, 
      private route: ActivatedRoute,
      private router: Router,
      private fishService: fishService,
      private dataService: DataStorageService) {}

      calmnessValues = [
        { id: 0, label: "Shy, delicate fish" },
        { id: 1, label: "Shy, less active fish" },
        { id: 2, label: "Neutral behaviour" },
        { id: 3, label: "Active fish" },
        { id: 4, label: "Aggresive and territorial" },
        { id: 5, label: "Predatory and piscivorous(fish eater)" },
        { id: 6, label: "Extremely aggresive" },
    ]
 
 
  
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; 
          this.editMode = params['id'] != null;  
          this.deleteConfirmation=false;
          this.showEditForm=false;
          console.log('this id is :'+this.id)
          this.initForm();
  })
  
  
  
  }

   
    // sendToShopList() {
    //   this.ingredientService.addAllIngredients(this.fish.ingredients)
    // }
    
    

    onFishEdit() {
      this.showEditForm=!this.showEditForm;
    }
    
    onSubmit() {
      // console.log('WORKS');
      this.updatedFish  = this.fishForm.value;
     
       
     
      this.router.navigate(['/fishes'])
       console.log('data from form is:'+ JSON.stringify(this.fishForm.value));
    }


    private initForm() { 
        
        let commonName: String;
        let latinName: String;
        let commonLength: number;
        let pictureLink: String;
        let phMin: number;
        let phMax: number;
        let dhMin: number;
        let dhMax: number;
        let tempMin: number;
        let tempMax: number; 
        let calmness: number = 2; 
        let schooling: boolean = false;
        
      
        if(this.editMode) {
          console.log('1234')
          const fish = this.fishService.getFish(this.id);
          commonName = fish.commonName;
          latinName = fish.latinName;
          commonLength = fish.commonLength;
          pictureLink = fish.pictureLink;
          phMin = fish.phMin;
          phMax = fish.phMax;
          dhMin = fish.dhMin;
          dhMax = fish.dhMax;
          tempMin = fish.tempMin;
          tempMax = fish.tempMax; 
          calmness = fish.calmness;
          schooling = fish.schooling;
          console.log( "calmness is: "+ calmness)
        }
      
        this.fishForm = new FormGroup({
          // 'id': this.id,
          'commonName': new FormControl(commonName, Validators.required),
          'latinName': new FormControl(latinName, Validators.required),
          'commonLength': new FormControl(commonLength, Validators.required),
          'pictureLink': new FormControl(pictureLink, Validators.required),
          'phMin': new FormControl(phMin, Validators.required),
          'phMax': new FormControl(phMax, Validators.required),
          'dhMin': new FormControl(dhMin, Validators.required),
          'dhMax': new FormControl(dhMax, Validators.required),
          'tempMin': new FormControl(tempMin, Validators.required),
          'tempMax': new FormControl(tempMax, Validators.required),
          'calmness': new FormControl(calmness, Validators.required),
          'schooling': new FormControl(schooling, Validators.required),
          // 'count': new FormControl(count, Validators.required),
  

        });
       
      }

      onReturnToFishDetail() {
        this.router.navigate(['/fishes/'+this.id])
      }



    onSaveEditedFish() {
      // this.checkFish();
      this.onSubmit();
      
      
      console.log('11' +this.fishService.getFish(this.id))      ;
      
      this.updatedFish["id"] = this.id;

      this.fishService.updateFish(this.id,  this.updatedFish);
      this.dataService.storeFish(this.id); 
      console.log('222')
    }

    onSaveNewFish() {
      console.log('this.updatedFish 1:'+this.updatedFish)   
      this.onSubmit();
      this.dataService.addFish(this.updatedFish); 
      console.log('this.updatedFish 2:'+this.updatedFish)   
      console.log('this.updatedFish 3:'+this.updatedFish)      
    }


    checkFish() {
     console.log('checked fish is :'+this.fishService.getFish(this.id))
    }

    onDeletefish() {
      this.deleteConfirmation=true;
      console.log(this.deleteConfirmation)
    }

    deletefish() {
      this.fishService.deleteFish(this.id);
      this.router.navigate(['/fishes'])
    }
    
    sendToFishesPage() {
      this.router.navigate([ '../'], {relativeTo: this.route})
    }
     
  }
  