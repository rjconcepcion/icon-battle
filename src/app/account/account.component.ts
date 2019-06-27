import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  constructor() { }
  creator : any = {};
  showloader : boolean = false;

  ngOnInit() {

  }

  _rePasswordChecking() : boolean {
    return this.creator.password === this.creator.password2 ? true : false;
  }

  onSubmit() : void {
    console.log(this.creator.password);
  }

}
