import { Component, Input, OnInit } from '@angular/core';
import { Setuplistitem } from "./setuplistitem";

@Component({
  selector: 'setuplistitem',
  templateUrl: './setuplistitem.component.html',
  styleUrls: ['./setuplistitem.component.css']
})
export class SetuplistitemComponent implements OnInit {

  @Input()
  listitems: Setuplistitem[];

  constructor() { }

  ngOnInit() {
  }

}
