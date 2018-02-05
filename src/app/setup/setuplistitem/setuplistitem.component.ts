import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Setuplistitem } from "./setuplistitem";
import { LISTITEMS } from "./templistitemdata";


@Component({
  selector: 'setuplistitem',
  templateUrl: './setuplistitem.component.html',
  styleUrls: ['./setuplistitem.component.css']
})
export class SetuplistitemComponent implements OnInit {

  
  setupListItems: Setuplistitem[];

  constructor(
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    //const myListItems = Object.values(LISTITEMS);
    
    //this.setupListItems = myLists.filter(setupList => setupList.status==="active");
    this.setupListItems = Object.values(LISTITEMS);
    this.getListItems();
  }
  
  getListItems(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    //this.heroService.getHero(id)
      //.subscribe(hero => this.hero = hero);
  }
  
  goBack(): void {
    this.location.back();
  }

}
