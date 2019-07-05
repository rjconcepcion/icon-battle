import { Component, OnInit } from '@angular/core';
import { Icon } from '../../../icon';
import { IconService } from '../../../icon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-icon-archive',
  templateUrl: './icon-archive.component.html',
  styleUrls: ['./icon-archive.component.sass']
})
export class IconArchiveComponent implements OnInit {

  icons : Icon[];
  filteredIcons : Icon[];

  _filterText : string;
  get filterText() : string {
    return this._filterText;
  }
  set filterText(value : string) {
    this._filterText = value;
    this.filteredIcons = this.filterText ? this.performFilter(this.filterText) : this.icons;
  }

  // PAGINATION
  totalIcons : number;
  iconPerPage : number

  constructor(
    private iconService : IconService
  ) {
    this.iconPerPage = 8;
  }



  getIcons() : void {

    this.iconService.allIcons().subscribe((icons : Icon[])=>{
      this.icons = icons;
      this.filteredIcons = icons;

      this.totalIcons = icons.length;

    });
  }

  performFilter(filterText : string) {
    filterText = filterText.toLocaleLowerCase();
    return this.icons.filter((icon : Icon) => icon.name.toLocaleLowerCase().indexOf(filterText) !== -1);
  }

  test() : void {
    console.log(this.filteredIcons);
  }

  ngOnInit() {
    this.getIcons()
  }

}
