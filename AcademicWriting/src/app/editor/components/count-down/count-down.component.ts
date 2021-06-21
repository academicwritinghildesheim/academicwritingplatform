import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() countUporDown = '';
  @Input() stunden = 0;
  @Input() minuten = 0;

    private subscription: Subscription;
  
    public dateNow = new Date();
    public dDay = new Date('May 16 2021 00:00:00');
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    //public daysToDday;


    private getTimeDifferenceCountUp () {
        this.timeDifference = new Date().getTime()-this.dDay.getTime();
        this.allocateTimeUnits(this.timeDifference);
    }

    private getTimeDifferenceCountDown () {
      this.timeDifference = this.dDay.getTime() - new Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        //this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

    ngOnInit() {
      this.dDay = new Date();
      if(this.countUporDown== "down"){
        let tempMinutes=this.dDay.getMinutes()+ this.minuten;
        if(tempMinutes>=60){
          this.stunden+=1
        }
        this.dDay.setMinutes(tempMinutes)
        this.dDay.setHours(this.dDay.getHours() + this.stunden)
        this.subscription = interval(1000)
        .subscribe(x => { this.getTimeDifferenceCountDown(); });
      }
      else{
               this.subscription = interval(1000)
           .subscribe(x => { this.getTimeDifferenceCountUp(); });
      }

    }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

}