import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Icon } from  '../Icon';
import { IconService } from '../icon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.sass']
})
export class IconListComponent implements OnInit {
  searchedName : string = '';
  value : string = '';
  icons : Icon[];
  showloader : boolean;
  modalRef: BsModalRef;

  totalItems : number;
  maxSize : number;
  itemsPerPage : number;
  currentPage : number;
  page : number = 1;
  skip : number = 0;
  // page : number = 2;
  // total : number = 10;
  // limit : number = 3;

// 1
1// 2
// 3

// 4
2// 5
// 6

// 7
3// 8
// 9

4// 10

  constructor(private iconService: IconService, private modalService: BsModalService) { }
  pageChanged(event: any): void {

 
    this.skip = (event.page - 1) * 3
  }
  ngOnInit() {
    this.getIcons();  
  }
  getIcons(): void {
    this.showloader = true;
    this.iconService.getIcons()
    .subscribe(
      (response: any) =>{
        console.log(response);
        this.icons = response.data;
        this.totalItems = 7;
        // this.maxSize = response.totals.max;
        this.itemsPerPage = 3;
      },
      // icons => {

      //   console.log(icons.data);

      //   //this.icons = icons.data;
      // },
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
    this.iconService.addIcon({
      name : name.trim(),
      hp: this.iconService.rand(8,10),
      rock:this.iconService.rand(4,9),
      paper:this.iconService.rand(4,9),
      scissor:this.iconService.rand(4,9),
    } as Icon)
    .subscribe(icon => {
      this.modalRef.hide();
      this.showloader = false;
      this.icons.push(icon);
    });
  }  
  delete(icon: Icon): void{
    this.showloader = true;
    this.icons = this.icons.filter(h => h !== icon);
    this.iconService.deleteIcon(icon).subscribe(
      () => {},    
      (error: any) => {
        console.log(error);
      },
      () => {
        this.showloader = false;
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
        this.modalService.onHidden.subscribe((reason: string) => {
          this.value = '';
        })
  }
  temp() : void {
    alert('coming soon');
  }
}
