import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"; 

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  componentToShow: string = "welcome"; 

  constructor(private http: HttpClient ) { } 

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

	onLogin(input: any): void {
		this.http.post<any>('http://localhost:8080/login',
		    {
		        login: input.login,
		        password: input.password
		    }).subscribe(
          response => {
            console.log("login response is :"+response.login);
			console.log( response)
		        // this.authService.setAuthToken(response.token);
		        this.componentToShow = "messages";
		    }, 
		    error => {
		        // this.authService.setAuthToken(null);
		        this.componentToShow = "welcome";
		    }
        );

	}

  onRegister(input: any): void {
		this.http.post<any>('http://localhost:8080/register',
        {
          firstName: input.firstName,
          lastName: input.lastName,
          login: input.login,
          password: input.password
        }).subscribe(
          response => {
			console.log("register response is :"+response)
		        // this.authService.setAuthToken(response.token);
		        this.componentToShow = "messages";
		    }, 
		    error => {
		        // this.authService.setAuthToken(null);
		        this.componentToShow = "welcome";
		    }
        );

	}


}
