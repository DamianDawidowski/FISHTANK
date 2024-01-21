import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "./user.service";
import { Observable, map, take } from "rxjs";



@Injectable(
    {providedIn: 'root'}
    )
  export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
   
      canActivate(
          route: ActivatedRouteSnapshot,
          router: RouterStateSnapshot
          ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> 
          | UrlTree{
          return this.userService.user.pipe(
            take(1),
            map(user => {
            const isAuth = !!user; 
            if(isAuth) {
              return true;
            }
            return this.router.createUrlTree(['/auth'])
          }));
      } 
  }