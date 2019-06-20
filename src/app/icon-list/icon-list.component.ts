import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Icon } from  '../Icon';
import { IconService } from '../icon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.sass']
})
export class IconListComponent implements OnInit {

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

  searchedName : string = '';
  value : string = '';
  icons : Icon[];

  modalRef: BsModalRef;

  candidate_creator : string = null;
  creator : string = this.cookieService.check('creator') ? this.cookieService.get('creator') : null;

  constructor(private iconService: IconService, private modalService: BsModalService,private cookieService: CookieService) { }
  
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
        this.searchedName = "";
        this.showloader = false;
      }
    );
  }
  findIcon(name: string): void {
    this.showloader = true;
    this.iconService.searchIcon(name).subscribe(
      icons => {
        this.icons = icons;
      }, 
      (error: any) => {
        console.log(error);
      },
      () => {
        this.showloader = false;
      }
    );
  }

  add(name: string): void {    
    this.showloader = true;
    if(this.currentPage > 1){
      this.currentPage = 1;
    }
    this.iconService.addIcon({
      name : name.trim(),
      hp: this.iconService.rand(8,10),
      rock:this.iconService.rand(4,9),
      paper:this.iconService.rand(4,9),
      scissor:this.iconService.rand(4,9),
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
          this.value = '';
        })
  }
  _setCreator () : void {
    if(this.creator === null){
      this.cookieService.set( 'creator', this.candidate_creator );
      this.creator = this.cookieService.get('creator');
    }
  }


}
