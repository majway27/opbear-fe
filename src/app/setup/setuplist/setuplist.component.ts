import { Component, Input, OnInit } from '@angular/core';

import { List } from '../model/list'

@Component({
  selector: 'setuplist',
  templateUrl: './setuplist.component.html',
  styleUrls: ['./setuplist.component.css'],
})
export class SetuplistComponent implements OnInit {

  @Input()
  lists: List[];
  //lists: Setuplist[];
  
  constructor() { }

  ngOnInit() {
  }
}