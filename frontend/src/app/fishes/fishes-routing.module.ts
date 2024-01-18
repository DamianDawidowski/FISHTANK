import { FishesComponent } from "./fishes.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { fishDetailComponent } from "./fish-detail/fish-detail.component";
import { fishEditComponent } from "./fish-edit/fish-edit.component";
import { FishtankPreview } from "./fishtank-preview/fishtank-preview.component";




const appRoutes: Routes = [ 
    { path: '', 
    component: FishesComponent, 
    canActivate: [AuthGuard],
    children: [ 
    //   { path: '', component: StartComponentComponent}, 
      { path: 'new', component: fishEditComponent}, 
      { path: ':id', component: fishDetailComponent },   
      
      { path: ':id/edit', component: fishEditComponent},  
       ], 
},  
]
 
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})

export class FishesRoutingModule {

}