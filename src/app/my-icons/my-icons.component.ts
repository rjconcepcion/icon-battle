import { Component, OnInit, TemplateRef } from '@angular/core';
import { Icon } from  '../Icon';
import { Player } from  '../player';
import { IconService } from '../icon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { PlayerService } from '../player.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-icons',
  templateUrl: './my-icons.component.html',
  styleUrls: ['./my-icons.component.sass']
})
export class MyIconsComponent implements OnInit {

  creator : any;
  readOnlyCreator : string;
  showloader = false;
  texty : string = '';
  modalRef: BsModalRef;

  noIcon : boolean = false;
  iconName : string;
  
  // Pagination
  totalItems : number = 0;
  maxSize : number;
  itemsPerPage : number;
  currentPage : number;
  page : number = 1;
  skip : number = 0;

  icons : Icon[];

  constructor(
    private iconService: IconService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private playerService: PlayerService    
  ) { }



  ngOnInit() {

    if(this.cookieService.check('creator')){
      this.creator = JSON.parse(this.cookieService.get('creator'));      
    }
    this.getIcons();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
      this.modalService.onHidden.subscribe((reason: string) => {
        this.iconName = '';
        if(!this.creator){
          this.readOnlyCreator = '';
        }
      })
  }

  add(name: string) {
    this.showloader = true;
    if(!this.creator){
      this.texty = "Checking if name exist..";
    }
    this.playerService.findPlayer(this.readOnlyCreator).subscribe((response : any)=> {
      if(response.length){                
        this.texty = "The name exist, please think another name...";
        setTimeout(()=>{
          this.showloader = false;  
        }, 1000);        
      }else{
        this.texty = "Saving your icon..";
        if(this.currentPage > 1){
          this.currentPage = 1;
        }
        this.noIcon = false;
        this.iconService.addIcon({
          name : name.trim(),
          hp: this.iconService.rand(8,10),
          rock:this.iconService.rand(4,9),
          paper:this.iconService.rand(4,9),
          scissor:this.iconService.rand(4,9),
          creator:this.creator ? this.creator['username'] : this.readOnlyCreator,
        } as Icon)
        .subscribe((response: any) => {

          if(this.icons === undefined){
            this.icons = [];
            this.icons.push(response);
          }else{
            this.icons.unshift(response);
          } 
          this.totalItems += 1;
          if(this.currentPage === 1 && this.totalItems > 8){
            this.icons.pop();
          }
          this.modalRef.hide()
          this.showloader = false;
          this._setCreator();
        })
      }
    });
  } 

  _setCreator () : void {
    if(this.creator === undefined){
      this.cookieService.set( 'creator', JSON.stringify({'username':this.readOnlyCreator}) );
      this.creator = JSON.parse(this.cookieService.get('creator'));
    }
  }

  getIcons() : void {
    if(this.creator !== undefined){
      this.noIcon = false;
      this.showloader = true;
      this.iconService.searchIconBy('creator',this.creator['username']).subscribe((response : any)=>{
        
        if(!response.data.length){
          this.noIcon = true;
        }

        this.icons = response.data;
        this.totalItems = response.totals.total;
        this.itemsPerPage = environment.maxIcon;
        this.showloader = false;
      });
    }else{
      this.noIcon = true;
    }
  }

  // PAGINATION EVENTS
  pageChanged(event: any): void {
    this.showloader = true;
    this.skip = (event.page - 1) * environment.maxIcon;
    this.currentPage = event.page
    this.iconService.paginateIconsBy('creator',this.creator['username'],this.skip)
    .subscribe(
      (response: any) =>{
        console.log(response);
        this.icons = response.data;
        this.totalItems = response.totals.total;
        this.itemsPerPage = environment.maxIcon;
        this.showloader = false;
      },
      (error: any) => {
        console.log(error);
      },
    );
  }

  delete(icon: Icon): void{
    this.showloader = true;
    this.texty = "Deleting the icon :-(";
    this.iconService.deleteIcon(icon).subscribe(
      (response: any) =>{
        this.texty = "Arranging icon list & pagination...";
        this.iconService.paginateIconsBy('creator',this.creator['username'],this.skip).subscribe((response: any)=>{          
          this.icons = this.icons.filter(h => h !== icon);
          this.totalItems -= 1;
          this.itemsPerPage = environment.maxIcon;          
          this.icons = response.data;
          this.showloader = false;
          this.texty = '';
          if(this.icons.length === 0){
            this.noIcon = true;
          }
        });
      },   
      (error: any) => {
        console.log(error);
      }
    );
  }

}
