import { NgModule } from "@angular/core"; 
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginComponent, LoginDialog } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MatDialogModule } from "@angular/material/dialog";
 
@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        LoginDialog],
    imports: [
        CommonModule, 
        FormsModule, 
        MatDialogModule,
        RouterModule.forChild([
            {path: '', component: LoginComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent} 
        ]), 
    ] 
}) 

export class AuthModule {}