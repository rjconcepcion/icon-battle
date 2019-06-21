import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Icon } from  '../Icon';
import { IconService } from '../icon.service';
import { BattleService } from '../battle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.sass']
})
export class BattleComponent implements OnInit {
  creator : string;
  creatorIcon : string;
  creatorHp : number;
  icon : Icon[];
  enemy : Icon[];

  enemyHp : number;
  enemyCurrentAtk : string;
  enemyAttackBg = ['rgb(255, 76, 76)','rgb(102, 102, 255)','rgb(69, 162, 69)'];
  enemyBgCounter : number = 0;

  attackList = ['rock','paper','scissors'];


  constructor(
    private cookieService: CookieService,
    private iconService: IconService,
    private route: ActivatedRoute,
    private battleService: BattleService,
  ) { }

  ngOnInit() {
    this.creator = this.cookieService.get('creator');
    
    this.route.paramMap.subscribe(params => {
      this.creatorIcon = params.get('fakeIconId');
    });

    this.iconService.searchIconById(this.creatorIcon).subscribe(
      (response : any) => {
        this.icon = response[0];
        this.creatorHp = response[0].hp;
      },
      (error: any) => {
        console.log('error');
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );
    this.searchEnemy();
  }

  searchEnemy() : void {
    this.battleService.enemiesList()
    .subscribe(
      (response : any) => {
        let enemy = response[Math.floor(Math.random() * response.length)];
        this.enemy = enemy;
        this.enemyHp = enemy.hp;
      }
    );
  }

  enemyAttack()  {
    this.enemyCurrentAtk = this.attackList[this.iconService.rand(0,2)];
    return this.enemyCurrentAtk;
  }

  creatorAtk(atkType : number)  {

    let battle = this.battleResult(this.attackList[atkType],this.enemyAttack());
    
    
    this.enemyBgCounter += 1;
    if(this.enemyBgCounter == 3){
      this.enemyBgCounter = 0;
    }
    
    console.log(battle);
    

  }

  battleResult(p1Atk : string, p2Atk : string) {
    let result = {};
    if(p1Atk == 'rock' && p2Atk == 'rock'){
      result = {
        win : 0,
        dmg : 0,
      }
    } else if(p1Atk == 'paper' && p2Atk == 'paper'){
      result = {
        win : 0,
        dmg : 0,
      }
    } else if(p1Atk == 'scissors' && p2Atk == 'scissors'){
      result = {
        win : 0,
        dmg : 0,
      }
    } else if(p1Atk == 'rock' && p2Atk == 'scissors'){
      result = {
        win : 1,
        dmg : this.icon['rock'],
      }
    } else if(p1Atk == 'paper' && p2Atk == 'rock'){
      result = {
        win : 1,
        dmg : this.icon['paper'],
      }
    } else if(p1Atk == 'scissors' && p2Atk == 'paper'){
      result = {
        win : 1,
        dmg : this.icon['scissor'],
      }
    } else if(p1Atk == 'scissors' && p2Atk == 'rock'){
      result = {
        win : 2,
        dmg : this.enemy['rock'],
      }
    } else if(p1Atk == 'rock' && p2Atk == 'paper'){
      result = {
        win : 2,
        dmg : this.enemy['paper'],
      }
    } else if(p1Atk == 'paper' && p2Atk == 'scissors'){
      result = {
        win : 2,
        dmg : this.enemy['scissor'],
      }
    }
    
    return result;
  }

}
