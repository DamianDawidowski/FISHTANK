import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FishtankComponent } from "../fishtank.component";
import { Subscription, TimeInterval } from "rxjs";
import { fishTankService } from "src/app/shared/fishtank.service";
import { Fishtank } from "src/app/shared/fishtank.model";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

  interface oneFishIconData {
  name:string,
  length:number,
  pictureLink: string,

}

interface iconPosition {
  top:string,
  left:string,  
  horizontalVelocityMax: number,
  verticalVelocityMax:number,
  horizontalFactor:number,
  verticalFactor:number,  
  delay:number,
}

@Component({
    selector:'app-fishtank-layout',
    templateUrl: './fishtank-layout.component.html',
    styleUrls: ['./fishtank-layout.component.css']
  })
export class FishTankLayout implements OnInit, OnDestroy{
  fishEvalSubscription:Subscription;
  tankSubscription:Subscription; 
  allFishIconData: oneFishIconData[]=[];  
  // tank:Fishtank;
  tankLength:number;
  tankheight:number;
  heightToLenRatio:number;
  coverTopValue:string;
  swimmingHeight:string;
  bacgroundHeight:string;
  positions: iconPosition[]=[];
  intervalPositionfactors; 
  intervalPositions; 
  intervalDelays; 
  isAnimated:boolean = false;
   // delay in ms, used to calculate iterative position, and placed in setInterval for the iteratePositions function
  delay:number = 100;
  // intervals:[TimeInterval<number>]=[int<>];

  constructor(private baseComponent: FishtankComponent,
    private tankService: fishTankService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('ngOnInit')
    if (this.isAnimated) {
      this.stopAnimatons();
   }
    this.fetchFishData();
    this.getCoverPosition();
    this.calculatePositions();
  }

  // ngAfterViewInit() {
  //   console.log('ngAfterViewInit')
  //    this.cdr.detectChanges();
  //    this.fetchFishData();
  //    this.getCoverPosition();
  // }

ngOnChanges() {
  if (this.isAnimated) {
    this.stopAnimatons();
 }
  console.log('ngOnChanges')
  this.fetchFishData();
  // this.getCoverPosition();
}

  fetchFishData() {
   
    this.tankSubscription =   this.tankService.tank.subscribe(tank => { 
      console.log('tankSubscription')
      if (tank === null) { 
        return
      } else {
        this.tankLength=tank.length;
        this.tankheight=tank.height;
        this.heightToLenRatio = tank.height/tank.length;
        if( this.heightToLenRatio>0.6) {
          this.heightToLenRatio = 0.6;
        } else if(this.heightToLenRatio<0.04) {
          this.heightToLenRatio = 0.04;
        }
       // // console.log('tank 222'+JSON.stringify(this.tank ));
       }
        
        this.getCoverPosition();
        this.getHeights();
        console.log('fetchFishData 2')
     this.calculatePositions();

      //  this.isAnimated = false;
       
//      setTimeout(() => {
//      this.stopAnimatons();
//  }, 500);


   
      });

        console.log('WORSK ')
        console.log('this.positions is :' + JSON.stringify(this.positions))
  }

  getLength(index: number) {
    return Math.min(((this.allFishIconData[index].length/this.tankLength)*100 ),70)+'%'; 
  }

  // getTop(index: number) {
  //   return (Math.random()*((24.5*this.heightToLenRatio*1.74)-((this.allFishIconData[index].length/this.tankLength)*40))    )+'vw';
  // }

  calculatePositions() {
    
    this.fishEvalSubscription =   this.baseComponent.finalFishesInTankSubject.subscribe(list => { 
      this.allFishIconData =[];  
      this.positions = [];
        // console.log('works AAA'  );
         console.log('list is 222: '+JSON.stringify( list ));
        list.forEach((data)=>{
          
          let fishData:oneFishIconData = {
                    name:data.commonName,
                    length:data.commonLength,
                    pictureLink:data.pictureLink,
                  }; 
        
         for (var i = 1; i <= data.count; i++) {
          // console.log('MAX TOP IS:' +((24.5*this.heightToLenRatio*1.74)-((data.commonLength/this.tankLength)*40)))
          let calcTop:number;
          let calcLeft:number;
          let calcHorizontalVelocityMax:number;
          let calcVerticalVelocityMax:number;
       
        //    let calcTop:number = (( (24.5*this.heightToLenRatio*1.74)-((data.commonLength/this.tankLength)*40))    ); 
      
         calcTop =  Math.max( this.getRandom(0,(100-(data.commonLength/this.tankheight)*70)) ,0) 

        //  calcTop =   Math.max(0, Math.random()*((24*this.heightToLenRatio*1.74)-((data.commonLength/this.tankLength)*50))  )      

            //     calcTop =   Math.max(0,((24*this.heightToLenRatio*1.74)-((data.commonLength/this.tankLength)*50))  )      
        
         //          calcTop =   Math.max(0,((24*this.heightToLenRatio*1.74)-((data.commonLength/this.tankLength)*35))  )     

            
         //          calcTop = Math.random()*((24*this.heightToLenRatio*1.74)-((data.commonLength/this.tankLength)*24))   

       
          calcLeft = Math.max( this.getRandom(0,(100-(data.commonLength/this.tankLength)*100)) ,0)  
        // calcLeft = (Math.random()*((40-((data.commonLength/this.tankLength)*40))    ));  

        // I assumed calcVelocityMax as the maximum length a fish would swim in one second, ten times its own body length. Units are % of Tank length and Tank Height!
        calcHorizontalVelocityMax = data.commonLength/this.tankLength >0.8 ? 0 : (data.commonLength/this.tankLength)*1000 ;
        calcVerticalVelocityMax = data.commonLength/this.tankLength >0.8 ? 0 : (data.commonLength/this.tankLength)*1000 ;
        console.log('calcHorizontalVelocityMax IS:' +calcHorizontalVelocityMax)

      //     let calcLeft:number = ((40-((data.commonLength/this.tankLength)*40)    )); 
      let intervalDelay = this.getRandom(2000,8000)

          let coordinate: iconPosition = {
            top: calcTop+'%',
            left: calcLeft+'%',
            horizontalVelocityMax: calcHorizontalVelocityMax,
            verticalVelocityMax:calcVerticalVelocityMax,
            horizontalFactor:0,
            verticalFactor:0,
            delay:intervalDelay,
          }

          this.positions.push(coordinate);
            this.allFishIconData.push(fishData); 
         }
       
        //  fishData.name = list.
        })


        }) 
       
        // this.positions.forEach((position,index)=> {
        //   let count = 0;
        //  console.log('WORSK ')
        //  this.interval = setInterval(()=> {
        //     count++;
        //     console.log('count is: '+count)
        //     this.interval =   this.iteratePositions(index,position.velocityMax)
        //   }, 3000)
        //   ;
        // })

        // this.iteratePositions(0,this.positions[0].velocityMax)
  }

  iteratePositions(indexInArray:number,horizontalVelocity:number, verticalVelocity:number,verticalFactor:number,horizontalFactor:number) {
  
    // setInterval(func, delay)
    console.log('verticalVelocity is: '+ (verticalVelocity))
    console.log('verticalFactor is: '+ (verticalFactor))
    console.log('horizontalFactor is: '+ (horizontalFactor))

  let position: iconPosition = this.positions[indexInArray];

  let duration:number = Math.random()*100;

  
  
  // let verticalFactor:number =  this.getRandom(-1,1);
  let top: string =   this.positions[indexInArray].top;
  let  topValue: number = +top.slice(0, -1); 
  let calcNewTop: number =  topValue+= (verticalVelocity*(this.delay/1000))*verticalFactor*0.3;
    if(calcNewTop<0) {
      calcNewTop = 0;
      this.positions[indexInArray].verticalFactor = -verticalFactor/3;
      this.positions[indexInArray].horizontalFactor = horizontalFactor/2;
    } else if (calcNewTop<10 && verticalFactor<0) {
      this.positions[indexInArray].verticalFactor = verticalFactor/1.2;
    } else if(calcNewTop> (100-(verticalVelocity/10))) {
      calcNewTop = (100-(verticalVelocity)/10);
      this.positions[indexInArray].verticalFactor = -verticalFactor/3;
      this.positions[indexInArray].horizontalFactor = horizontalFactor/2;
    } else if(calcNewTop> (100-(verticalVelocity/10))-10 && verticalFactor>0) { 
      this.positions[indexInArray].verticalFactor = verticalFactor/1.2; 
    } 
   

 



  //  let horizontalFactor:number = this.getRandom(-1,1);
  let left: string =   this.positions[indexInArray].left;
  let leftValue: number = +left.slice(0, -1); 
  let calcNewleft: number = leftValue+= (horizontalVelocity*(this.delay/1000))*horizontalFactor;
  if(calcNewleft<0) {
    calcNewleft = 0;
    this.positions[indexInArray].verticalFactor = verticalFactor/2;
    this.positions[indexInArray].horizontalFactor = -horizontalFactor/3;
  } else if(calcNewleft<10 && horizontalFactor<0) {  
    this.positions[indexInArray].horizontalFactor = horizontalFactor/1.5;
  } else if(calcNewleft<25 && horizontalFactor<0) {  
    this.positions[indexInArray].horizontalFactor = horizontalFactor/1.1;
  } else if(calcNewleft> (100-((horizontalVelocity/10)))) {
    calcNewleft = (100-((horizontalVelocity/10)));
    this.positions[indexInArray].verticalFactor = verticalFactor/2;
    this.positions[indexInArray].horizontalFactor = -horizontalFactor/3;
  } else if(calcNewleft> (100-((horizontalVelocity/10))-10)) {
    this.positions[indexInArray].horizontalFactor = horizontalFactor/1.5; 
  } else if(calcNewleft> (100-((horizontalVelocity/10))-25)) {
    this.positions[indexInArray].horizontalFactor = horizontalFactor/1.1; 
  } 

 

    this.positions[indexInArray].top =  calcNewTop +'%',
    this.positions[indexInArray].left = calcNewleft+'%' 
    console.log('leftValue is: '+leftValue + '  calcNewleft is: '+calcNewleft)
    console.log('topValue is: '+topValue + '  calcNewTop is: '+calcNewTop)

    // console.log('New top is: '+this.positions[indexInArray].top + 'New left is: '+this.positions[indexInArray].left)
    // console.log('positions is: '+ JSON.stringify(this.positions))
    }

 
  getHeights() {
   this.swimmingHeight = (23.5*this.heightToLenRatio*1.74)+'vw'; 
   this.bacgroundHeight= 26.5 - (24.5*this.heightToLenRatio*1.7)+'vw'; 
  }

  getCoverPosition() {
    this.coverTopValue = (21-24*this.heightToLenRatio*1.7)+'vw'; 
   }



  checkData(){
    console.log('allFishIconData is: '+JSON.stringify(this.allFishIconData))
  }

   getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

switchAnimation() {
  if (this.isAnimated) {
    this.stopAnimatons();
 }
  console.log('ANIMATE' )
  this.isAnimated = !this.isAnimated;
  if(this.isAnimated) {

    
    let countdown = 1;

 

     

    let count = 0
    this.positions.forEach((position,index)=> { 
      let nr = index;
     nr =   window.setInterval(()=> {
        console.log('position.delay si : '+position.delay)
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        let verticalFactor:number = (Math.pow(this.getRandom(-1,1), (3)))*plusOrMinus;
        this.positions[index].verticalFactor = verticalFactor;

        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        let horizontalFactor:number = (Math.pow(this.getRandom(0,1), (3)))*plusOrMinus;
        ;
        this.positions[index].horizontalFactor = horizontalFactor;

      },this.positions[index].delay);
   


    })
 
    setInterval(()=> {
        this.positions.forEach((position,index)=> { 

     
              // let intervalName:string = String(index) 
          

          let verticalFactor:number =  this.positions[index].verticalFactor;
          let horizontalFactor:number =   this.positions[index].horizontalFactor;

          count++;

          // console.log('count is: '+count)
      this.iteratePositions(index,position.horizontalVelocityMax, position.verticalVelocityMax, verticalFactor,horizontalFactor)
        })}, this.delay)
     
    

  }

   console.log('this.isAnimated is: '+this.isAnimated)
}
 
stopAnimatons() { 
  const interval_id = window.setInterval(function(){},1000000);

  // Clear any timeout/interval up to that id
  for (let i = 1; i < interval_id; i++) {
     window.clearInterval(i);
    console.log('clearInterval 1' )
   }

}

ngOnDestroy(): void {
  console.log('clearInterval 2' )
  if (this.isAnimated) {
    this.stopAnimatons();
 }
//   if (this.intervalPositions) {
//     clearInterval(this.intervalPositions);
//  }

 
} 
} 
 
/**
 * @title Basic slide-toggles
 */
@Component({
  selector: 'slider-animation',
  template:  `<mat-slide-toggle (change)="setMessage($event)" #animationSwitch>{{message}}</mat-slide-toggle>` ,
  standalone: true,
  styleUrls: ['./slider.component.css'],
  imports: [MatSlideToggleModule],
})
export class SlideToggleOverviewExample {
  @ViewChild('darkModeSwitch', { read: ElementRef }) element: ElementRef | undefined;
  message = 'ANIMATE your fish!';

  power: string = '';

  ngAfterViewInit() {
    if (this.element){
      this.element.nativeElement.querySelector('.mdc-switch__icon--on').firstChild.setAttribute('d', this.power);
      this.element.nativeElement.querySelector('.mdc-switch__icon--off').firstChild.setAttribute('d', this.power);
    }
  }
  setMessage(e){
    if(e.checked)
      this.message = 'STOP the animation'
    else
      this.message = 'ANIMATE your fish!'
  }
}

 