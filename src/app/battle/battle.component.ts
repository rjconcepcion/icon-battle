import { Component, OnInit, TemplateRef, Input, ViewChild  } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { Icon } from  '../Icon';
import { IconService } from '../icon.service';
import { BattleService } from '../battle.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.sass']
})
export class BattleComponent implements OnInit {

  totalWins : number = 0;
  totalHits : number = 0; 
  showloader :boolean = true;
  texty : string;
  zIndex : string = "1040";

  creator : string;
  creatorIcon : string;
  creatorHp : number;
  creatorHpPercent : number = 100;
  icon : Icon[];
  enemy;



  enemyList : Icon[];
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
  enableLog : boolean = true;
  battleLog()  {
    let result = false;
    if(this.getHit == 1){
      result = "WIN";
    }else if(this.getHit == 2){
      result = "LOOSE";
    }else if(this.getHit == 3){
      result = "DRAW";
    }
    return result;
  }

  modalRef: BsModalRef;
  template : any;

  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  isModalShown : boolean;
 
  constructor(
    private cookieService: CookieService,
    private iconService: IconService,
    private route: ActivatedRoute,
    private battleService: BattleService,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.creatorIcon = params.get('fakeIconId');
    });

    if(this.cookieService.check('creator')){
      this.creator = this.cookieService.get('creator');
      this.setMyIcom();
    }

  }
  ngAfterViewInit(){
    if(!this.cookieService.check('creator')){
      this.showModal();
    }
  }



  showModal() : void {
    this.autoShownModal.show();
    console.log(this.autoShownModal);
    this.autoShownModal.onHidden.subscribe((reason: string) => {
      this.autoShownModal.show();
    })    
  }

  hideModal() : void {
    this.autoShownModal.hide();  
  }
  
  setMyIcom() : void {
    this.showloader = true;
    this.texty = "Creating bonding between you and the selected icon.";
    this.iconService.searchIconById(this.creatorIcon).subscribe(
      (response : any) => {
        this.icon = response[0];
        this.creatorHp = response[0].hp;
        this.searchEnemy();
      },
      (error: any) => {
        console.log('error');
      }
    );
  }

  searchEnemy() : void {
    this.texty = "Searching your opponent icon";    
    this.battleService.enemiesList()
    .subscribe(
      (response : any) => {
        this.enemyList = response;
        let enemy = response[Math.floor(Math.random() * response.length)];
        this.enemy = enemy;
        this.enemyHp = enemy.hp;
        this.showloader = false;
      }
    );
  }

  enemyAttack()  {
    this.enemyCurrentAtk = this.attackList[this.iconService.rand(0,2)];
    //this.enemyCurrentAtk = 'paper'; //Uncomment for testing
    return this.enemyCurrentAtk;
  }

  _dmgPercentCalc (value: number, total : number) : number {
   return (value/total) * 100;
  }

  creatorAtk(atkType : number)  {
    var battle = this.battleResult(this.attackList[atkType],this.enemyAttack());

    console.log(battle);

    this.enemyBgCounter += 1;
    if(this.enemyBgCounter == 3){
      this.enemyBgCounter = 0;
    }
    this.getHit = battle.win;
    if(battle.win == 1){
      this.totalHits += 1;
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
    }else if(battle.win == 0 && battle.dmg == 0){
      this.getHit = 3;
      setTimeout(()=>{
        this.getHit = 0;    
      }, 1000);       
    }
  
    if(this.enemyHpPercent == 0){
      this.totalWins += 1;
      setTimeout(()=>{
        let enmy = this.enemyList[Math.floor(Math.random() * this.enemyList.length)];
        this.enemy = enmy;
        this.enemyHp = enmy.hp;
        this.enemyHpPercent = 100;
        this.enemyCurrentAtk = false;
        this.getHit = 0; 
      }, 3000);
    }else{
      setTimeout(()=>{
        this.getHit = 0;      
      }, 1000); 
    }
  
  }

  showLog() {
    this.enableLog = this.enableLog ? false : true;
    console.log(this.enableLog);
    console.log(this.totalWins);
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

  setCreator(name: string) : void {
    this.cookieService.set( 'creator', name );
    this.creator = this.cookieService.get('creator');
    window.location.reload();
  }

  
}
