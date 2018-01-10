import { Component, Input, OnInit } from '@angular/core';
import { Setuplist } from "./setuplist";

@Component({
  selector: 'setuplist',
  templateUrl: './setuplist.component.html',
  styleUrls: ['./setuplist.component.css']
})
export class SetuplistComponent implements OnInit {

  @Input()
  lists: Setuplist[];
  
  constructor() { }

  ngOnInit() {
  }

}
