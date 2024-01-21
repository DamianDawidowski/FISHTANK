import { Component, Input } from '@angular/core'; 
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	@Input() pageTitle: string; 
  username: string ='';
  logoSrc: string = './../../assets'
  constructor(private userService: UserService ) { } 

  ngOnInit() {
    this.userService.user.subscribe(user => {
      if (user?.login !=null) {
        this.username =  user!.login;
      } 
    });
  } 
}
