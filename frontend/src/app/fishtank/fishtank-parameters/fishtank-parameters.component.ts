import { Component, OnInit, OnDestroy, Input } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { User } from "src/app/auth/user.model";
import { UserService } from "src/app/auth/user.service";
import { DataStorageService } from "src/app/shared/data.storage.service";
import { Fishtank } from "src/app/shared/fishtank.model";
import { FishDetail, fishTankService } from "src/app/shared/fishtank.service";
import { FishtankComponent, fishEval, tankEval } from "../fishtank.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TankSetupDialog } from "./tankParameters-dialog/tankSetup-dialog.component";

@Component({
    selector:'app-fishtank-parameters',
    templateUrl: './fishtank-parameters.component.html',
    styleUrls: ['./fishtank-parameters.component.css']
})
export class FishTankParameters implements OnInit{
  @Input() tank: Fishtank;
  @Input() finalFishesInTank;
  @Input() tankScore:number;
  @Input() tankEval:tankEval; 
  isTankSetup: boolean = false;
  showWelcome: boolean = false;
  showTankForm: boolean = false;
  editWaterParams: boolean = false;
  waterParams: boolean = false;
  tankForm: FormGroup; 
  volume: number;
  user: User;
  subscription: Subscription; 
  foundTemperature:number;
  foundPH:number;
  foundDH:number; 
  appealToEditMessage:string;
  welcomeDialog:MatDialogRef<WelcomeDialog,any>;  

  constructor(private tankService: fishTankService,
    private userService: UserService,
    private dataStorage: DataStorageService,
    private baseComponent: FishtankComponent,
    private dialog: MatDialog,) {}
 
  ngOnInit(): void {  
    this.userService.user.subscribe(user => { 
      this.user =  user; 
    }); 
    if (this.tank) {
      if (this.tank.fishesInTank.length>0) {
          this.editWaterParams =true;
      } if (this.welcomeDialog) {
        this.welcomeDialog.close();
      } 
    } 
    if(this.tankEval) {
      this.createMessage();
    }
  }  

  ngOnChanges(): void { 
    if(this.tank) {
    if (this.tank !== null && this.tank !== undefined) { 
      this.isTankSetup =  true;  
    }
    }
    setTimeout(() => { 
      if(!this.tank) {
        this.openWelcomeDialog();
        this.showWelcome = true;
      } 
    }, 500);  
    this.initForm();   
    if(this.tankEval) {
      this.createMessage();
    } 
  }
  
  createMessage(){
    if(this.tankScore<=0 && this.tankEval.isDHGood && this.tankEval.isTempGood && this.tankEval.isPHGood) {
      this.appealToEditMessage =  'Your tank parameters appear to satisfy your fish. Good job'
    }
    else if (this.tankScore<=0) {
      this.appealToEditMessage =  'Your tank parameters appear to mostly satisfy your fish. Please check each fish individually on the left panel, looking for any blinking alerts.'
    }
    else if (this.tankScore<5) {
      this.appealToEditMessage = 'There appear to be minor problems with your tank. Check the right panel (water parameters) and the left panel (blinking icons representing issues for individual fish) for clues, and consider modifying its properties below.';
    } else if (this.tankScore<10) {
      this.appealToEditMessage = 'There appear to be significant problems with your tank. Check the right panel (water parameters) and the left panel (blinking icons representing issues for individual fish) for clues, and consider modifying its properties below.';
    } else {
      this.appealToEditMessage = 'There appear to be severe problems with your tank. Check the right panel (water parameters) and the left panel (blinking icons representing issues for individual fish) for clues, and consider modifying its properties below.';
    }
  } 

  private initForm() { 
    let tankName: String;
    let length: number;
    let height: number;
    let depth: number;
    let ph: number = 1;
    let dh: number = 0; 
    let temperature: number = 0;  

    if(this.isTankSetup && this.tank) { 
      tankName = this.tank.tankName;
      length = this.tank.length;
      height = this.tank.height;
      depth = this.tank.depth;
      ph = this.tank.ph;
      dh = this.tank.dh;
      temperature = this.tank.temperature;  
    } 
    this.tankForm = new FormGroup({ 
      'tankName': new FormControl(tankName, [Validators.required, Validators.minLength(4)]),
      'length': new FormControl(length, Validators.required),
      'height': new FormControl(height, Validators.required),
      'depth': new FormControl(depth, Validators.required),
      'ph': new FormControl(ph),
      'dh': new FormControl(dh),
      'temperature': new FormControl(temperature)  
    }); 
  }
 
  onShowTankForm() { 
    this.openTankDesignDialog(); 
  }

  onSubmit() { 
    //PUT RESULTS FROM DIALOG HERE
    this.tank = this.tankForm.value;
    let id = this.user.id
    this.tank["userId"] = id; 
    this.showTankForm = false;
  }

  onShowWaterParamsForm() {
    this.editWaterParams=true;
  }

  onCreateTank() { 
    this.onSubmit();  
    this.tank["fishesInTank"] = [];
    this.dataStorage.addTank(this.tank) 
  }

  getVolume() {
    return this.volume = (this.tank.length * this.tank.height * this.tank.depth)/1000;
  }

  onFindWaterParams() { 
    let TempSum:number=0; 
    let pHSum:number=0; 
    let dHSum:number=0;
    let count:number=0;

    this.finalFishesInTank.forEach((fish) => {
      count++; 
      TempSum+=fish.tempMin+fish.tempMax;
      pHSum+=fish.phMin+fish.phMax;
      dHSum+=fish.dhMin+fish.dhMax;
    })
    this.foundTemperature = TempSum/(count*2);
    this.foundPH = pHSum/(count*2);
    this.foundDH = dHSum/(count*2); 
  } 

  onUpdateTank() {
    let id = this.tank.id; 
    let fishesInTank = this.tank.fishesInTank;
    this.onSubmit();
    if(!this.tank.temperature) {
      this.tank["temperature"] = 0;
    }
    if(!this.tank.ph) {
      this.tank["ph"] =1;
    }
    if(!this.tank.dh) {
      this.tank["dh"] = 0;
    }
    this.tank["id"] = id;
    this.tank["fishesInTank"] = fishesInTank;  
    if(!this.isTankSetup) {
      this.tank["fishesInTank"] = [];
      this.dataStorage.addTank(this.tank) 
    } else { 
      this.dataStorage.saveTank(this.tank)
      this.tankService.tank.next(this.tank);
    } 
    setTimeout(()=> {
        this.baseComponent.loadTank(); 
    },300);
    this.baseComponent.evaluateTank(); 
    setTimeout(()=> { 
      this.baseComponent.evaluateFishes();
    },600); 
  } 

  get tankName() {
    return this.tankForm.get('tankName');
  } 

  openTankDesignDialog( ) { 
    this.onFindWaterParams(); 
    const dialogRef = this.dialog.open(TankSetupDialog, {
      data: {
        username: this.user.firstName,
        tank: this.tank,
        isTankSetup: this.isTankSetup,
        foundTemperature: this.foundTemperature,
        foundPH: this.foundPH,
        foundDH: this.foundDH, 
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {   
        this.tankForm = result['tankForm']; 
        this.showWelcome = false;
      } 
      if(this.isTankSetup) {
        this.onUpdateTank();
      } else {
        this.onCreateTank();
      } 
    });
  }

  openWelcomeDialog() {
    this.welcomeDialog = this.dialog.open(WelcomeDialog); 
  }  
}

 
@Component({
    selector: 'login-dialog',
    template: `<div style="padding:20px;white-space: pre-line"><h4>{{message}}</h4></div>`, 
  })
export class WelcomeDialog {
  message:string='Thank you for installing and using my FISHTANK app!\n If this is your first time with the app, please start with setting up the tank in the "My Tank" tab - the button should be highlighted with a green arrow.\n Afterwards, add fish from the "Fish" tab, and return to My tank tab to see how they fit.\n Pay attention to any blinking allerts and keep adjusting the tank parameters as necessary.\n This is a highly responsive application that continuously evaluates all crucial parameters and guides you into setting up an aquarium where your fish may live a long and healthy life. \n Happy playing!';
}