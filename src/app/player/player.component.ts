import { Component, OnInit } from '@angular/core';
import { Player } from  '../player';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, NgControl } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {

  playerForm = this.pf.group({
    username : ['', {
      validators : [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*'),
      ]
    } ],
    motto : [''],
    password : ['', {
      validators : [
        Validators.required,
        Validators.minLength(6),
      ]
    } ],
    password2 : ['', {
      validators : [
        Validators.required,
        Validators.minLength(6),
        this.confirmPassword,
      ]
    } ]
  });
  
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private pf: FormBuilder,
  ) { }

  showloader = false;
  creator : Player[];

  player : any = {};

  ngOnInit() {

  }

  // ngOnDestroy() {
  //   //console.log(this.creator);
  // }

  // onSubmit() : void {
  //   console.log(this.playerForm.value);
  // }

  // _rePasswordChecking() : boolean {
  //   return false;
  // }

  banWords(control: FormControl){

    let username = control.value;
    if(username == 'sa'){
      return {
        banWords : 'You cant use that word'
      }
    }
    return null;
  }

  confirmPassword(control : FormGroup) {
    let password = control.root.get('password');
    let password2 = control.value;



    if(password != null){

      if(password.value != password2){

        return {
          notMatch : {msg:'Password not match'}
        }
      }

      return null;
    }

  }

}
