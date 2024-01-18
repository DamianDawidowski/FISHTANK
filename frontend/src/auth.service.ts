// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() {
//     // axios.defaults.baseURL = 'http://localhost:8080';
//     // axios.defaults.headers.post['Content-Type'] = 'application/json';
//   }

//   getAuthToken(): string | null {
//     return window.localStorage.getItem("auth_token");
//   }

//   setAuthToken(token: string | null): void {
//     if (token !== null) {
//       window.localStorage.setItem("auth_token", token);
//     } else {
//       window.localStorage.removeItem("auth_token");
//     }
//   }
 

// //   request(method: string, url: string, data: any): Promise<any> {
// //       let headers: any = {};

// //       if (this.getAuthToken() !== null) {
// //           headers = {"Authorization": "Bearer " + this.getAuthToken()};
// //       }

// //       return axios({
// //           method: method,
// //           url: url,
// //           data: data,
// //           headers: headers
// //       });
// //   }
// }
