import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; 
import { exhaustMap, take } from "rxjs/operators";
import { UserService } from "./user.service";
 

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.userService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                  return next.handle(req);
                }
                const modifiedReq = req.clone({
                  params: new HttpParams().set('auth', user.getToken())
                });
                return next.handle(modifiedReq);
              })
            );
          }
        }