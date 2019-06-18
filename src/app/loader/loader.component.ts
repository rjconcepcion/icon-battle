import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]  
})
export class LoaderComponent implements OnInit {
  
  private _showloader : boolean;


  @Input()
  set showloader(showloader : boolean){
    this._showloader = showloader;
  }
  get showloader(){
    return (this._showloader === undefined || null) ? true : this._showloader;
  }

  constructor() { }

  


  ngOnInit() {
  }

}
