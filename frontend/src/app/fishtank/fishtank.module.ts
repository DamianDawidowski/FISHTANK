import { NgModule } from "@angular/core"; 
import { FishtankComponent } from "./fishtank.component";
import { RouterModule } from "@angular/router";
import { FishtankRoutingModule } from "./fishtank-routing.module";
import { FishTankLayout, SlideToggleOverviewExample } from "./fishtank-layout/fishtank-layout.component";
import { FishTankParameters } from "./fishtank-parameters/fishtank-parameters.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { fishlistIntank } from "./fishlist-intank/fishlist-intank.component";
import { TankParameterEvalDialog, fishtankErrors } from "./fishtank-errors/fishtank-errors.component";
import { MatSliderModule } from "@angular/material/slider";
import { Rounding } from "../shared/roundingPipe";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog"; 
import { fishIconDialog } from "./fishlist-intank/fishIcon-dialog/fishIcon-dialog.component";
import { fishNumberDialog } from "./fishlist-intank/fishNumber-dialog/fishNumber-dialog.component";
import { TankSetupDialog } from "./fishtank-parameters/tankParameters-dialog/tankSetup-dialog.component"; 
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


@NgModule({
    declarations: [
        FishtankComponent, 
        FishTankLayout,
        FishTankParameters,
        fishlistIntank,
        fishtankErrors,
        Rounding,
        TankParameterEvalDialog,
        fishIconDialog,
        fishNumberDialog,
        TankSetupDialog,  
    ],
    exports: [ 
        Rounding,
        FishtankComponent
    ],
    imports: [
        RouterModule,   
        FishtankRoutingModule,
        ReactiveFormsModule,
        MatSliderModule, 
        CommonModule,
        MatDialogModule,
        SlideToggleOverviewExample,
        MatSlideToggleModule 
    ],
    providers: [
        fishlistIntank, FishtankComponent ], 
})
export class FishtankModule {}