import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Icon } from  '../Icon';
import { Player } from  '../player';
import { IconService } from '../icon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.sass']
})
export class IconListComponent implements OnInit {

  hero : any;
  searchTerm : string;
  searching : boolean = false;
  iconName : string;
  //Loading
  showloader :boolean = false;
  texty : string;

  // Pagination
  totalItems : number;
  maxSize : number;
  itemsPerPage : number;
  currentPage : number;
  page : number = 1;
  skip : number = 0;


  value : string = '';
  icons : Icon[];

  modalRef: BsModalRef;

  candidate_creator : string = null;
  creator : Player = this.cookieService.check('creator') ? JSON.parse(this.cookieService.get('creator')) : null;
  readOnlyCreator : string;

  constructor(private iconService: IconService, private modalService: BsModalService,private cookieService: CookieService,private playerService: PlayerService) { }
  
  ngOnInit() {  
    this.getIcons();  
  }
  
  // PAGINATION EVENTS
  pageChanged(event: any): void {
    this.showloader = true;
    this.skip = (event.page - 1) * environment.maxIcon;
    this.currentPage = event.page
    this.iconService.paginateIcons(this.skip)
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
  

  getIcons(): void {
    this.showloader = true;
    this.iconService.getIcons()
    .subscribe(
      (response: any) =>{
        this.icons = response.data;
        this.totalItems = response.totals.total;
        this.itemsPerPage = environment.maxIcon;
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        this.searchTerm = "";
        this.showloader = false;
        this.searching = false;
      }
    );
  }
  findIcon(name: string): void {
    this.showloader = true;
    this.iconService.searchIcon(name).subscribe(
      icons => {
        this.icons = icons;
        this.searching = true;
      }, 
      (error: any) => {
        console.log(error);
      },
      () => {
        this.showloader = false;
      }
    );
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
        this.iconService.addIcon({
          name : name.trim(),
          hp: this.iconService.rand(8,10),
          rock:this.iconService.rand(4,9),
          paper:this.iconService.rand(4,9),
          scissor:this.iconService.rand(4,9),
          creator:this.creator ? this.creator['username'] : this.readOnlyCreator,
        } as Icon)
        .subscribe((response: any) => {
          if(this.currentPage === 1){
            this.icons.unshift(response);
            this.icons.pop();
          }
          this.modalRef.hide()
          this.totalItems += 1;
          this.showloader = false;
          this._setCreator();
        })
      }
    });
  }  
//
// Yesterday I continue my test angular app, also I fix issue in edit function.

//
  delete(icon: Icon): void{
    this.showloader = true;
    this.texty = "Deleting the icon :-(";
    this.iconService.deleteIcon(icon).subscribe(
      (response: any) =>{
        this.texty = "Arranging icon list & pagination...";
        this.iconService.paginateIcons(this.skip).subscribe((response: any)=>{          
          this.icons = this.icons.filter(h => h !== icon);
          this.totalItems -= 1;
          this.itemsPerPage = environment.maxIcon;          
          this.icons = response.data;
          this.showloader = false;
          this.texty = '';
        });
      },   
      (error: any) => {
        console.log(error);
      }
    );
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
  _setCreator () : void {
    if(this.creator === null){
      this.cookieService.set( 'creator', JSON.stringify({'username':this.readOnlyCreator}) );
      this.creator = JSON.parse(this.cookieService.get('creator'));
    }
  }


}
