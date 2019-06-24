import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Icon } from  '../Icon';
import { IconService } from '../icon.service';
import { BattleService } from '../battle.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.sass']
})
export class BattleComponent implements OnInit {


  showloader :boolean = true;
  texty : string;

  creator : string;
  creatorIcon : string;
  creatorHp : number;
  creatorHpPercent : number = 100;
  icon : Icon[];
  enemy : Icon[];

  enemyHp : number;
  enemyHpPercent : number = 100;
  enemyCurrentAtk : string;
  enemyAttackBg = ['rgb(255, 76, 76)','rgb(102, 102, 255)','rgb(69, 162, 69)'];
  enemyAttackPosition = [
    ['10px', '33px'],
    ['100px', '33px'],
    ['55px', '97px'],      
  ];
  enemyBgCounter : number = 0;

  attackList = ['rock','paper','scissors'];

  getHit : number = 0;

  constructor(
    private cookieService: CookieService,
    private iconService: IconService,
    private route: ActivatedRoute,
    private battleService: BattleService,
  ) { }

  ngOnInit() {

    if(this.cookieService.check('creator')){
      this.creator = this.cookieService.get('creator');
      this.route.paramMap.subscribe(params => {
        this.creatorIcon = params.get('fakeIconId');
      });
      this.setMyIcom();
    }else{
        this.texty = "Dont be shy set your name";
    }

  }


  setMyIcom() : void {
    this.showloader = true;
    this.texty = "Creating bonding between you and the selected icon.";
    this.iconService.searchIconById(this.creatorIcon).subscribe(
      (response : any) => {
        this.showloader = false;
        this.icon = response[0];
        this.creatorHp = response[0].hp;
        this.searchEnemy();
      },
      (error: any) => {
        console.log('error');
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );
  }

  searchEnemy() : void {
    this.showloader = true;
    this.texty = "Searching your opponent icon";    
    this.battleService.enemiesList()
    .subscribe(
      (response : any) => {
        let enemy = response[Math.floor(Math.random() * response.length)];
        this.enemy = enemy;
        this.enemyHp = enemy.hp;
        this.showloader = false;
      }
    );
  }

  enemyAttack()  {
    this.enemyCurrentAtk = this.attackList[this.iconService.rand(0,2)];
    
    setTimeout(function(){
      this.enemyCurrentAtk = null;
    },2000);
     return this.enemyCurrentAtk;
  }

  _dmgPercentCalc (value: number, total : number) : number {
   return (value/total) * 100;
  }

  creatorAtk(atkType : number)  {

    var battle = this.battleResult(this.attackList[atkType],this.enemyAttack());
    
    
    this.enemyBgCounter += 1;
    if(this.enemyBgCounter == 3){
      this.enemyBgCounter = 0;
    }
    
    this.getHit = battle.win;

    if(battle.win == 1){
      let dmg = this._dmgPercentCalc(battle.dmg,this.enemyHp);

      if(dmg > this.enemyHpPercent){
        this.enemyHpPercent = 0;
      }else{
        this.enemyHpPercent -= dmg;
      }

    }else if(battle.win == 2){

      let dmg = this._dmgPercentCalc(battle.dmg,this.creatorHp);

      if(dmg > this.creatorHpPercent){
        this.creatorHpPercent = 0;
      }else{
        this.creatorHpPercent -= dmg;
      }

    }else{

    }
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
