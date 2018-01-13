import { Component, Input, OnInit } from '@angular/core';
import { Setuplistitem } from "./setuplistitem";
import { LISTITEMS } from "./templistitemdata";


@Component({
  selector: 'setuplistitem',
  templateUrl: './setuplistitem.component.html',
  styleUrls: ['./setuplistitem.component.css']
})
export class SetuplistitemComponent implements OnInit {

  
  setupListItems: Setuplistitem[];

  constructor() { }

  ngOnInit() {
    //const myListItems = Object.values(LISTITEMS);
    
    //this.setupListItems = myLists.filter(setupList => setupList.status==="active");
    this.setupListItems = Object.values(LISTITEMS);
  }

}
