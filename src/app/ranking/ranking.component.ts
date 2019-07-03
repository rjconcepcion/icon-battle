import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Player } from  '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.sass']
})
export class RankingComponent implements OnInit {

	showloader = false;
	creator : Player;

  constructor(
private cookieService: CookieService,
private playerService: PlayerService
  	) { }

  ngOnInit() {
    if(this.cookieService.check('creator')){
      this.creator = JSON.parse(this.cookieService.get('creator'));      
    }  	
  }

}
