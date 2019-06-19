import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Icon } from  '../Icon';
import { IconService } from '../icon.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  constructor(private iconService: IconService) { }
  @Output() icons = new EventEmitter<Icon>();
  current_page : number = 0;

  next() : void {

    this.iconService.nextIcons()
    .subscribe(
      icons => {
        // this.icons.emit(this.icons);
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        console.log(this);
      }
    );
  }
  
  ngOnInit() {
  }

}
