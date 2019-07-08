import { Component, OnInit, TemplateRef  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Icon } from '../../../icon';
import { IconService } from '../../../icon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-icon-archive',
  templateUrl: './icon-archive.component.html',
  styleUrls: ['./icon-archive.component.sass']
})
export class IconArchiveComponent implements OnInit {

  totalIcons : number;
  iconPerPage : number
  skipPage : number;
  searchResultPaged : Icon[];
  currentPage : number;
  showPage : boolean =  false;

  modalRef: BsModalRef;

  icons : Icon[];
  filteredIcons : Icon[];
  _filterText : string;
  get filterText() : string {
    return this._filterText;
  }
  set filterText(value : string) {
    this._filterText = value;
    this.searchResultPaged = this.filterText ? this.performFilter(this.filterText) : this.icons;
    this.totalIcons = (this.filterText === undefined) ? this.icons.length : this.searchResultPaged.length;
    this.filteredIcons = this.searchResultPaged.slice(0,this.iconPerPage);
    this.showPage = (this.searchResultPaged.length < this.iconPerPage) ? false : true;
  }

  createIconForm = new FormGroup({
    creator: new FormControl(''),
    name: new FormControl(''),
  });


  constructor(
    private iconService : IconService,
    private modalService: BsModalService,
  ) {
    this.iconPerPage = 3;
  }

  getIcons() : void {
    this.iconService.allIcons().subscribe((icons : Icon[])=>{
      this.icons = icons;
      this.filteredIcons = this.icons.slice(0, this.iconPerPage);
      this.totalIcons = icons.length;
      this.showPage = true;
    });
  }

  performFilter(filterText : string) {
    filterText = filterText.toLocaleLowerCase();
    let result = this.icons.filter((icon : Icon) => icon.name.toLocaleLowerCase().indexOf(filterText) !== -1);
    this.totalIcons = result.length;
    setTimeout(()=>this.currentPage = 1,0);
    return result;
  }

  pageChanged(event: any): void {
    this.skipPage = (event.page) * this.iconPerPage;
    this.filteredIcons = this.icons.slice(this.skipPage - this.iconPerPage, this.skipPage);
    if(this.filterText !== undefined){
      this.filteredIcons = this.searchResultPaged.slice(this.skipPage - this.iconPerPage, this.skipPage);
    }
  }



  onSubmit() {
    let icon = Object.assign(this.createIconForm.value, this._iconRandomStats() );
    this.iconService.addIcon(icon).subscribe((icon : Icon)=>{
      this.icons.unshift(icon);

      // if(this.icons === undefined){
      //   this.icons = [];
      //   this.icons.push(icon);
      // }else{
      //   this.icons.unshift(icon);
      // }
      // this.totalIcons += 1;
      // /*REMOVE LAST ICON IF HAVE NEXT PAGE*/
      // if(this.currentPage === 1 && this.totalIcons > this.iconPerPage){
      //   this.icons.pop();
      // }
      this.modalRef.hide()
    });
  }

  _insertIconObject(icon : Icon) : void {


  }

  _iconRandomStats() : Object {
    return {
      hp: this.iconService.rand(8,10),
      rock:this.iconService.rand(4,9),
      paper:this.iconService.rand(4,9),
      scissor:this.iconService.rand(4,9),
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    //this.getIcons()

    // const data = from(fetch(`${environment.endpoint}icon-list?h={"$orderby": {"fake_id": -1}}`));
    // data.subscribe({
    //   next(response) { console.log(response); },
    //   error(err) { console.error('Error: ' + err); },
    //   complete() { console.log('Completed'); }
    //  });


     //console.log(this.icons$);

  }

  errorMessage : string;
  icons$ = this.iconService.icons$
    .pipe(
      catchError(error => {
        this.errorMessage = "error";
        return of(null);
      })
    );

}
