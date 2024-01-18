import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs"; 
import { User } from "./user.model";
import { DataStorageService } from "../shared/data.storage.service";
import { fishTankService } from "../shared/fishtank.service";

export interface AuthResponseData {
    id: number,
    firstName: string;
    lastName: string;
    login: string;
    token: string; 
} 
 
@Injectable({providedIn: 'root'})
export class UserService {
user = new BehaviorSubject<User>(null);
errorMessage = new BehaviorSubject<string>(null);
private tokenExpirationTimer: any;
 
    constructor(
        private http: HttpClient, private router: Router,
        private tankService: fishTankService) {}

onLogin(input: any): void {
    // console.log('local storage is :'+window.localStorage.getItem("auth_token"));
    this.http.post<AuthResponseData>('http://localhost:8080/login',
        {
            login: input.login,
            password: input.password
        }).subscribe(
      response => {
        this.handleAuthentication(
            response.id, 
            response.firstName, 
            response.lastName,
            response.login,
            response.token);
         
            this.router.navigate(['/fishtank']); 
        }, 
        error => { 
            // console.log('Unsuccesfull: ' +JSON.stringify(error))
            // console.log('Unsuccesfull: ' +JSON.stringify(error.error.message))
            this.errorMessage.next(error.error.message);

            // Unsuccesfull: {"headers":{"normalizedNames":{},"lazyUpdate":null},"status":404,"statusText":"OK",
            // "url":"http://localhost:8080/login","ok":false,"name":"HttpErrorResponse",
            // "message":"Http failure response for http://localhost:8080/login: 404 OK","error":{"message":"Unknown user"}}
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
        this.handleAuthentication(
            response.id, 
            response.firstName, 
            response.lastName,
            response.login,
            response.token);
            this.router.navigate(['/fishtank']);
             
        }, 
        error => {
          
        }
    ); 
}

autoLogin() {
    const userData: {
        id: number, 
        firstName: string;
        lastName: string;
        login: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
  if(!userData) {
    return;
  }
  const loadedUser = new User(
    userData.id,
    userData.firstName,
    userData.lastName,
    userData.login,
    userData._token,
    new Date(userData._tokenExpirationDate)
  );
  if (loadedUser.getToken) {
    this.user.next(loadedUser);
    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() -
      new Date().getTime();
 this.autoLogout(expirationDuration);
  }
}
 


    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
             this.logout();
         }, expirationDuration)
     }
  

logout() {
    this.user.next(null);
    this.errorMessage.next(null);
    this.tankService.tank.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth/login'])
    // localStorage.removeItem('userData');
    // this.router.navigate(['/auth']);
    // localStorage.removeItem('userData');
    // if(this.tokenExpirationTimer) {
    //     clearTimeout(this.tokenExpirationTimer)
    // }
    // this.tokenExpirationTimer = null;
}

getToken() {
    return this.user.subscribe(user => {
        // console.log('11'+user.getToken())
       return user.getToken()
    })
}

getUserId() {
    return this.user.subscribe(user => {
 
        // console.log('WORKS'+user.getUserId())
       return user.getUserId()
    })
}


private handleAuthentication(id: number,firstName: string, lastName: string, login: string, token: string) { 
    const expirationDate = new Date(new Date().getTime()+3600000);
    // console.log('expiration date is :'+expirationDate)
    const user = new User(id, firstName, lastName, login, token, expirationDate);
    // console.log('expiration date in user data is :'+user._tokenExpirationDate)
    this.user.next(user);
    this.autoLogout(3600000)
    localStorage.setItem('userData', JSON.stringify(user))
    }

}