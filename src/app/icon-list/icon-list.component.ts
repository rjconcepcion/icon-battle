import { Component, OnInit, TemplateRef } from '@angular/core';
import { Icon } from  '../Icon';
import { IconService } from '../icon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.sass']
})
export class IconListComponent implements OnInit {
  icons : Icon[];
  showloader : boolean;
  modalRef: BsModalRef;

  constructor(private iconService: IconService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getIcons();    
  }
  getIcons(): void {
    console.log('starting');
    this.iconService.getIcons()
    .subscribe(
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
