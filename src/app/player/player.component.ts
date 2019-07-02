import { Component, OnInit } from '@angular/core';
import { Player } from  '../player';
import { Icon } from '../icon';
import { IconService } from '../icon.service';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, NgControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {

  showloader = false;
  texty : string = '';
  errors : boolean = false;
  errors_msg = [];
  usernameExist : boolean;
  creator : Player[];

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
        this.MatchPassword,
      ]
    } ]
  });
  
  constructor(
    private playerService: PlayerService,
    private iconService: IconService,    
    private route: ActivatedRoute,
    private pf: FormBuilder,
    private cookieService: CookieService,    
  ) { }

  ngOnInit() {
    if(this.cookieService.check('creator')){
      this.creator = JSON.parse(this.cookieService.get('creator'));
    }
  }

  updateInfo()  {

    this.errors =  false;
    
    let password = this.playerForm.get('password').value;
    let password2 = this.playerForm.get('password2').value;
    let changePasswd : boolean = false;
    let changeMotto : boolean =this.playerForm.get('motto').dirty;

    if(password != ""){
      if((password != password2) || this.playerForm.get('password').invalid){
        this.errors_msg = ["Cant do update, invalid new password"];
        this.errors = true;
        return ;
      }
      changePasswd = true;
    }
    console.log(changePasswd);
    console.log('y');

    let obj = {
      'motto' : changeMotto ? this.playerForm.get('motto').value : this.creator['motto'],
      'password' : changePasswd ? this.playerForm.get('password').value : this.creator['password']
    }

    if(changePasswd || changeMotto){
      this.showloader = true;
      this.playerService.updateCreator(this.creator['_id'],obj as Player).subscribe((player : any) => {        
        this.playerService.setCreatorInCookie(player);
        this.showloader = false;
        window.location.reload();
      });
    }
  }


  onSubmit() : void {
    let username = this.playerForm.get('username').value;
    this.errors =  false;
    this.showloader = true;
    this.texty = "Validating the uniqueness of the name..";
    this.playerService.findPlayer(username)
    .subscribe((response : any)=>{
      if(!response.length){
        this.texty = "Creating your account...";
        this.playerService.addPlayer(this.playerForm.value as Player)
        .subscribe((response: any) => {
          this.texty = "logging....";
          this.creator = response;          
          this.playerService.setCreator(response._id);
          this.playerForm.get('password').setValue('');
          this.playerForm.get('password2').setValue('');
        },(error)=>{
          console.log(error);
        },()=>{
          setTimeout(()=>{
            this.showloader = false;   
          }, 1000); 
        })
      }else{        
        this.errors_msg = ["The name " + username + " is already exist, please try a unique name"];
        this.errors = true;
        this.showloader = false;
      }
    },(error)=>{

    });
  }


  MatchPassword(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    let password = control.root.get('password').value;
    let confirmPassword = control.root.get('password2').value;
     if(password != confirmPassword) {
         return {
          notMatch : {msg:'Password not match'}
        }
     } else {
         return null
     }
 }

  test(test : any) {
    console.log(test);
  }
  
}
