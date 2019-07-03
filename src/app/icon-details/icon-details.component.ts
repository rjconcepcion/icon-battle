import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Player } from  '../player';
import { Icon } from  '../icon';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { IconService } from '../icon.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-icon-details',
  templateUrl: './icon-details.component.html',
  styleUrls: ['./icon-details.component.sass']
})
export class IconDetailsComponent implements OnInit {

  showloader = false;
  texty : string;
  creator : Player;
  selectedIcon : string;
  icon : Icon;
  IconAuthor : Player;
  

  constructor(
    private iconService : IconService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService    
  ) { }

  ngOnInit() {

    if(this.cookieService.check('creator')){
      this.creator = JSON.parse(this.cookieService.get('creator'));      
    }   
    this.route.paramMap.subscribe(params => {
      this.selectedIcon = params.get('fakeIconId');
    });

    this.showloader = true;
    this.iconService.searchIconBy('fake_id',this.selectedIcon,'number').subscribe((response : any)=>{
      this.icon = response.data[0];
      this.showloader = false;
      // this.playerService.findPlayer(this.icon['creator']).subscribe((response : any)=>{
      //   this.showloader = false;
      //   this.IconAuthor = response.length ? response[0] : {'motto':'This user is not yet register.'};
      // });
    });
    
  }

}
