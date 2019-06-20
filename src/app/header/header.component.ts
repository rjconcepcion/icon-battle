import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() creator : string;




  

  constructor() { }

  ngOnInit() {
    this.creator = sessionStorage.getItem('creator');
  }

}
