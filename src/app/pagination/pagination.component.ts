import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems : number;
  @Input() maxSize : number;
  constructor() { }

  ngOnInit() {
  }

}
// 1 #0
// 2 #1
// 3 #2

// 4 #3
// 5 #4
// 6 #5

// 7 #6
// 8 #7
// 9 #6

// 10 #7