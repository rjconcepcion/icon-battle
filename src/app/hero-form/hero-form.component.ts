import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.sass']
})




export class HeroFormComponent implements OnInit {

  constructor() { }

  name : string = "kuku crunch";

  powers = ['creepy walk','nightmare','eat veggies']

  ngOnInit() {
  }

  log(val) {  }

  onSubmit() {
    console.log(this);
  }

  // get diagnostic() { return JSON.stringify(this.model); }
}