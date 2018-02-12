import { Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { List } from '../model/list'

import { ListService } from '../services/list.service';

@Component({
  selector: 'app-setuptable',
  templateUrl: './setuptable.component.html',
  styleUrls: ['./setuptable.component.css']
})

export class SetuptableComponent {
  mydisplayedColumns = ['listid','name'];
  //mydataSource = MYLISTS;
  mydataSource = new ListDataSource(this.listService);
  constructor(private listService: ListService) { }
  
}

export class ListDataSource extends DataSource<any> {
  constructor(private listService: ListService) {
    super();
  }
  connect(): Observable<List[]> {
    return this.listService.getMyLists();
  }
  disconnect() {}
}

const MYLISTS: List[] = [
  {listid: 0,name: "Clothing List",longDescription: "A template list for warm trip clothing",category: ['test1', 'test2'],status: "active",items: ['item1', 'item2']},
  {listid: 1,name: "Hiking Gear List",longDescription: "Backpacks, Boots.",category: ['test1', 'test2'],status: "active",items: ['item1', 'item2']},
  {listid: 2,name: "Food List",longDescription: "Some meals that we planned.",category: ['test1', 'test2'],status: "active",items: ['item1', 'item2']},
  {listid: 3,name: "Beer and drinks",longDescription: "Important liquids.",category: ['test1', 'test2'],status: "active",items: ['item1', 'item2']},
  {listid: 4,name: "Warm Trip Clothing.",longDescription: "A template list for warm trip clothing",category: ['test1', 'test2'],status: "locked",items: ['item1', 'item2']},
  {listid: 5,name: "An Old List.",longDescription: "An archived list I don't use anymore",category: ['test1', 'test2'],status: "archived",items: ['item1', 'item2']},
  {listid: 6,name: "Meals for Weekend Trip",longDescription: "Breakfast, Lunch, and Dinner for 2.5 days.",category: ['test1', 'test2'],status: "locked",items: ['item1', 'item2']},
  
];