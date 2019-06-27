import { Component, OnInit } from '@angular/core';
import { Player } from  '../player';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
  ) { }

  showloader = false;
  creator : Player[];

  player : any = {};

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log(this.creator);
  }

  onSubmit() : void {
    console.log(this.player);
    this.playerService.addPlayer(this.player as Player)
    .subscribe((response: any) => {
      this.creator = response;
    })
  }

  _rePasswordChecking() : boolean {
    return this.player.password === this.player.password2 ? true : false;
  }

}
