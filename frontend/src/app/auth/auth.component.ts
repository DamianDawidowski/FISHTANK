import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private userService: UserService) { } 

  // @Output() onSubmitLoginEvent = new EventEmitter();
  // @Output() onSubmitRegisterEvent = new EventEmitter();

	active: string = "login";
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";

	onLoginTab(): void {
		this.active = "login";
	}

	onRegisterTab(): void {
		this.active = "register";
	}

  onSubmitLogin(): void {
    // this.onSubmitLoginEvent.emit({"login": this.login, "password": this.password});
    this.userService.onLogin({"login": this.login, "password": this.password});



  }

  onSubmitRegister(): void {
   // this.onSubmitRegisterEvent.emit({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password});
    this.userService.onRegister({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password});
  }

}