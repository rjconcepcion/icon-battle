import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() creator : string;




  

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.creator = this.cookieService.get('creator');
  }

}
