import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { FishtankComponent } from "./fishtank.component"; 

const appRoutes: Routes = [ 
    { path: '', 
    component: FishtankComponent, 
    canActivate: [AuthGuard] 
    },  
]
 
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})

export class FishtankRoutingModule { 
}