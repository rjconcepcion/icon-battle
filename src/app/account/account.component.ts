import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Creator } from  '../Creator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  creator = 'sample';
  user : Creator[];
  showloader : boolean = false;

  constructor(
    private accountService: AccountService,    
  ) {}

  ngOnInit() {

  }

  onSubmit() : void {

    console.log(this.creator);

    this.accountService.addCreator(this.creator as Creator)
    .subscribe((response: any) => {
      console.log(response);
    })
  }

  _rePasswordChecking() : boolean {
    return this.creator.password === this.creator.password2 ? true : false;
  }



}
