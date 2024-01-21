import { Component } from '@angular/core'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService) { } 
 
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
    this.userService.onLogin({"login": this.login, "password": this.password});
  }

  onSubmitRegister(): void {
    this.userService.onRegister({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password});
  }
}