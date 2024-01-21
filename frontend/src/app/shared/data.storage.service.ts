import { HttpClient } from "@angular/common/http";
import { catchError, map, tap, throwError } from "rxjs";
import { Fish } from "./fish.model";
import { fishService } from "./fish.service"; 
import { Injectable, OnInit } from "@angular/core";
import { UserService } from "../auth/user.service";
import { fishTankService } from "./fishtank.service";
import { Fishtank } from "./fishtank.model"; 
import { backupData } from "src/app/shared/fishBackup";
 
@Injectable({providedIn: 'root'})
export class DataStorageService implements OnInit {
  token: string ='';
  userId: number;
  headers;
  constructor(private userService: UserService,
    private http: HttpClient,
    private fishService: fishService,
    private tankService: fishTankService) {
      this.userService.user.subscribe(user => {
        if(user) {
            this.token = user.getToken();
        this.userId = user.getUserId();
        } 
      })
      this.headers = {"Authorization": "Bearer " + this.token} 
    }
      
  ngOnInit() { 
    this.fetchTank()
  }
 
  fetchTank() {   
    return this.http.get<any>('http://localhost:8080/fishtank/'+this.userId,{headers: this.headers}).pipe(catchError(err => { 
      this.tankService.setTank(null,this.userId) 
      return throwError(err);
    })).subscribe(
      response => {  
        this.tankService.setTank(response, response.id) 
      } 
    )    
  }
  
  saveTank(tank:Fishtank) {
    const id = tank.id;  
    this.http.put('http://localhost:8080/fishtank/'+id,
    tank,{headers: this.headers}).subscribe(response => { 
    }) 
  }
  
  addTank(tank: Fishtank) {  
    this.http.post<Fishtank>('http://localhost:8080/fishtank',
    tank,{headers: this.headers}).subscribe(response => {
      this.tankService.createTank(response) 
    }) 
  }
   
  fetchFishes() {  
    return this.http.get<any>('http://localhost:8080/fish',{headers: this.headers}).pipe(catchError(err => {  
      this.addFish
      return throwError(err);
    })).subscribe(
        response => { 
          if(response.length===0) {
            backupData.FISH_BACKUPDB.forEach((fish) => this.addFish(fish));
            this.fishService.setFishes(backupData.FISH_BACKUP) 
          } else {
            response.sort(function(a, b) { 
              return a.id - b.id; 
            })
             this.fishService.setFishes(response)  
          } 
    }); 
  }

  storeFish(id:number) { 
    const fish = this.fishService.getFish(id);   
    this.http.put('http://localhost:8080/fish/'+id,
        fish,{headers: this.headers}).subscribe(response => { 
        }) 
  }

  addFish(fish: any) {  
    this.http.post<Fish>('http://localhost:8080/fish',
        fish,{headers: this.headers}).subscribe(response => {
          this.fishService.addFish(response) 
        }) 
  }

  deleteFish(id: number) { 
    this.http.delete<Fish>('http://localhost:8080/fish/'+id,
        {headers: this.headers}).subscribe(response => { 
          this.fishService.deleteFish(response.id) 
        }) 
  } 
}