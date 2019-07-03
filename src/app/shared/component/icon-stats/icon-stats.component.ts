import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-stats',
  templateUrl: './icon-stats.component.html',
  styleUrls: ['./icon-stats.component.sass']
})
export class IconStatsComponent implements OnInit {

  constructor() { }

  @Input() name : string;
  @Input() hp : string;
  @Input() rock : string;
  @Input() paper : string;
  @Input() scissor: string;
  
  ngOnInit() {
  }

}
