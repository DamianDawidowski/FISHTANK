import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent  implements OnInit {
  @Input() username:string;
  isLoggedIn: boolean = false;
  hasTank: boolean = true;
  mytank: String = this.hasTank? "My tank" : "Create a fishtank";
  
  constructor(private userService: UserService ) {
    
   }
 
  ngOnInit() {
     this.userService.user.subscribe(user => {
      if(user) {
        this.isLoggedIn=true;
      }
     })

  }

  ngDoCheck() {
    this.userService.user.subscribe(user => {
     if(user) {
       this.isLoggedIn=true;
     } else {
      this.isLoggedIn=false;
     }
    })

 }
 public onShowFishes() {

 }

 public onShowTank() {

 }

  public onLogin() {

  }

  public onRegister() {

  }

public onLogout() {
  this.userService.logout();
  }
}
