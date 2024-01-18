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
      private tankService: fishTankService
        ) {
          this.userService.user.subscribe(user => {
            if(user) {
                this.token = user.getToken();
            this.userId = user.getUserId();
            }
          
          })
        this.headers = {"Authorization": "Bearer " + this.token}



        }
      
    ngOnInit() {
      // console.log('data storage initialised')

        this.fetchTank()
    }

      
    fetchTank() { 

     console.log('fetched')
    
 return this.http.get<any>('http://localhost:8080/fishtank/'+this.userId,{headers: this.headers}).pipe(catchError(err => {
  console.log('There was an error getting data');
  this.tankService.setTank(null,this.userId) 
  return throwError(err);
})).subscribe(
          response => {
            // console.log('Got the data');
          //   this.data = response;
        
          // response.sort(function(a, b) { 
          //   return a.id - b.id;
          // })
        console.log('111111'+ JSON.stringify(response))
       this.tankService.setTank(response, response.id) 
      }
      // ,error => console.log('upps')
      )    
    }
  
    saveTank(tank:Fishtank) {
      const id = tank.id;
      // tank['id']=id;
      // console.log('XXXtank id is :'+JSON.stringify(tank))
     // console.log('the fish to update is :'+JSON.stringify(fish))
          
                   
  this.http.put('http://localhost:8080/fishtank/'+id,
  tank,{headers: this.headers}).subscribe(response => {
              // console.log('the fish that WAS updated  is :'+JSON.stringify(fish))
          })
  
      //  this.fetchTank();
  }
  
  addTank(tank: Fishtank) {
    
    
   // console.log('the fish to update is :'+JSON.stringify(fish))
        
                 
  this.http.post<Fishtank>('http://localhost:8080/fishtank',
  tank,{headers: this.headers}).subscribe(response => {
          this.tankService.createTank(response) 
        })
   
  }
  
  // deleteFish(id: number) {
    
    
  //   // console.log('the fish to update is :'+JSON.stringify(fish))
         
                  
  //  this.http.delete<Fish>('http://localhost:8080/fish/'+id,
  //        {headers: this.headers}).subscribe(response => {
   
  //          this.fishService.deleteFish(response.id) 
  //        })
   
      
  //  }



 



 
    fetchFishes() { 
      // console.log('headers in fetchfishes is :'+JSON.stringify(this.headers))
    return this.http.get<any>('http://localhost:8080/fish',{headers: this.headers}).pipe(catchError(err => {
      console.log('There was an error getting fish, fetching backup data');
       
      // this.fishService.setFishes(backupData.FISH_BACKUP);

      this.addFish
      return throwError(err);
    })).subscribe(
        response => {
        //   this.data = response;
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
    console.log('works 333 :')
    const fish = this.fishService.getFish(id);
    console.log('works 444 :')
   // console.log('the fish to update is :'+JSON.stringify(fish))
        
                 
this.http.put('http://localhost:8080/fish/'+id,
        fish,{headers: this.headers}).subscribe(response => {
            // console.log('the fish that WAS updated  is :'+JSON.stringify(fish))
        })

     
}

addFish(fish: any) {
  
  
 // console.log('the fish to update is :'+JSON.stringify(fish))
      
               
this.http.post<Fish>('http://localhost:8080/fish',
      fish,{headers: this.headers}).subscribe(response => {
        this.fishService.addFish(response) 
      })
 
}

deleteFish(id: number) {
  
  
  // console.log('the fish to update is :'+JSON.stringify(fish))
       
                
 this.http.delete<Fish>('http://localhost:8080/fish/'+id,
       {headers: this.headers}).subscribe(response => {
 
         this.fishService.deleteFish(response.id) 
       })
 
    
 }






}