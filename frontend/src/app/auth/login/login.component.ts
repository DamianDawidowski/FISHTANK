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

  // @Output() onSubmitLoginEvent = new EventEmitter();
  // @Output() onSubmitRegisterEvent = new EventEmitter();

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
          let dialogRef =    this.dialog.open(LoginDialog, {
          data: {
          errorMessage: this.errorMessage,
        },});
        }
      
      console.log('error is:'+errorMessage)
    });
   


 } 
 

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

  // openDialog(message: string) {
  //        this.dialog.open(LoginDialog, {
  //         data: {
  //           message:message
  //         },
  //       });
  //     }

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
        // console.log('tankEval in dialogue is: '+ (this.data['tankEval'].TankId))
        // console.log('tankEval in dialogue is: '+ JSON.stringify(this.data ))
    //     console.log('type in dialogue is: '+ (this.type['type']))
    //  console.log('recommendedValue in dialogue is: '+ (this.recommendedValue['recommendedValue']))
    }
     
  
    ngOnInit() {
      this.message =  this.message['errorMessage'];
    //    let difference:number;
    console.log('this.message is: '+ this.message)
      }
      
     
      ngOnChanges(){
       
           
          }

    }
  


