import { Component, OnInit } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';




@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.sass']
})




export class HeroFormComponent implements OnInit {

  constructor() { }

  name : string = "kuku crunch";

  powers = ['creepy walk','nightmare','eat veggies']

  // everySeconds : Observable<number> = timer(0,1000);

  private subscription: Subscription = new Subscription();
  
  timer$: Observable<number> = timer(0,1000)

  ngOnInit() {
    
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }

  }

  check() : void {
    console.table(this.subscription);
  }

  subs() : void {
    this.subscription = this.timer$.subscribe(testing => console.log(testing));
  }

  log(val) {  }

  onSubmit() {
    
  }


  // get diagnostic() { return JSON.stringify(this.model); }
}