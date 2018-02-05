import { Component, OnInit } from '@angular/core';
import { Setuplist } from "./setuplist/setuplist";
import { LISTS } from "./setuplist/templistdata";


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  setupListsActive: Setuplist[];
  setupListsLocked: Setuplist[];
  setupListsArchived: Setuplist[];

  constructor() { }

  ngOnInit() {
    const myLists = Object.values(LISTS);
  
    this.setupListsActive = myLists.filter(setupList => setupList.status==="active");
    this.setupListsLocked = myLists.filter(setupList => setupList.status==="locked");
    this.setupListsArchived = myLists.filter(setupList => setupList.status==="archived");
  
  }

}
