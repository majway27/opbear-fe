import { Component, OnInit } from '@angular/core';
import { Setuplist } from "./setuplist/setuplist";
import { LISTS } from "./setuplist/templistdata";
import { LISTITEMS } from "./setuplistitem/templistitemdata";
import { Setuplistitem } from "./setuplistitem/setuplistitem";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  setupLists: Setuplist[];
  setupListItems: Setuplistitem[];

  constructor() { }

  ngOnInit() {
    const myLists = Object.values(LISTS);
    const myListItems = Object.values(LISTITEMS);
  
    this.setupLists = Object.values(LISTS);
  
    this.setupListItems = [];
  }

}
