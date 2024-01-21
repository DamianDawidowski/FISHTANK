import { Component, Inject, Injectable, OnInit } from '@angular/core'; 
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  constructor(private userService: UserService,
    public dialog: MatDialog) { } 
  
	active: string = "login";
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";
  errorMessage: string = "";
  errorSubscription: Subscription;

  ngOnInit() {
    this.errorSubscription = this.userService.errorMessage.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
      if(this.errorMessage) {
        let dialogRef = this.dialog.open(LoginDialog, {
          data: {
          errorMessage: this.errorMessage,
          }
        });
      }      
    });
  } 
 
	onLoginTab(): void {
		this.active = "login";
	}

	onRegisterTab(): void {
		this.active = "register";
	}

  onSubmitLogin(): void {
    this.userService.onLogin({"login": this.login, "password": this.password});
  }

  onSubmitRegister(): void {
    this.userService.onRegister({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password});
  }
 
  ngOnDestroy() {
    console.log('destroyed 123: ')
    this.errorSubscription.unsubscribe();
  }
}


@Injectable()
@Component({
  selector: 'login-dialog',
  template: `<div style="padding:20px"><h4>An error occured: {{this.message}}</h4></div>`, 
})
export class LoginDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string) { 
  }
       
  ngOnInit() {
    this.message =  this.message['errorMessage'];
  } 

}