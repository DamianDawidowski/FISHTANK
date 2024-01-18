import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { FishtankComponent } from "./fishtank.component";




const appRoutes: Routes = [ 
    { path: '', 
    component: FishtankComponent, 
    canActivate: [AuthGuard],
    // children: [ 
    //   { path: '', component: StartComponentComponent}, 
    //   { path: 'new', component: RecipeEditComponent}, 
    //   { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},   
    //   { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},  
    //     ], 
},  
]
 
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})

export class FishtankRoutingModule {

}