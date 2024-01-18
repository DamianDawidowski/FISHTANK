import { NgModule } from "@angular/core";
import { FishesComponent } from "./fishes.component";
import { RouterModule } from "@angular/router";
import { FishesRoutingModule } from "./fishes-routing.module";
import { FishesListCOmponent } from "./fishes-list/fishes-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FishItemComponent } from "./fishes-list/fish-item/fish-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FishtankPreview } from "./fishtank-preview/fishtank-preview.component";
import { fishDetailComponent } from "./fish-detail/fish-detail.component";
import { fishEditComponent } from "./fish-edit/fish-edit.component";
import {MatSliderModule} from '@angular/material/slider';
import { FishtankComponent } from "../fishtank/fishtank.component";
import { FishtankModule } from "../fishtank/fishtank.module";


@NgModule({
    declarations: [
        FishesComponent, 
        FishesListCOmponent,
        FishItemComponent,
        FishtankPreview,
        fishDetailComponent,
        fishEditComponent,
    ],
    exports: [ 
    ],
    imports: [ 
     RouterModule,   
      
    ReactiveFormsModule,
    FishesRoutingModule,
     CommonModule,
     MatSliderModule,
    //   SharedModule,
    FormsModule, 
    
    ],
    providers: [FishtankComponent ],
})
export class FishesModule {}