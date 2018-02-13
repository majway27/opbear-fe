import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

import { List } from '../model/list'
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-setuptable',
  templateUrl: './setuptable.component.html',
  styleUrls: ['./setuptable.component.css']
})

export class SetuptableComponent implements OnInit {
  
  allLists: Observable<List[]>
  lists: List[];
  errorMessage: String;
  
  mydisplayedColumns = ['listid','name','longDescription','status'];
  mydataSource = new ListDataSource(this.listService);
  
  constructor(private listService: ListService) {}
  
  ngOnInit(): void {
    this.allLists = this.listService.getAllMyLists();
	  this.allLists.subscribe(
	    lists => this.lists = lists,
	    error =>  this.errorMessage = <any>error);
  }
  
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
  
}

export class ListDataSource extends DataSource<any> {
  constructor(private listService: ListService) {
    super();
  }
  connect(): Observable<List[]> {
    console.log("connect call")
    //let data = this.listService.getMyLists();
    let data = this.listService.getAllMyLists();
    console.log("return connect call")
    return data
  }
  disconnect() {}
}

/*const MYLISTS: List[] = [
  {listid: 0,name: "Clothing List",longDescription: "A template list for warm trip clothing",category: ['rest1', 'rest2'],status: "active",items: ['item1', 'item2']},
  {listid: 1,name: "Hiking Gear List",longDescription: "Backpacks, Boots.",category: ['rest1', 'rest2'],status: "active",items: ['item1', 'item2']},
  {listid: 2,name: "Food List",longDescription: "Some meals that we planned.",category: ['rest1', 'rest2'],status: "active",items: ['item1', 'item2']},
  {listid: 3,name: "Beer and drinks",longDescription: "Important liquids.",category: ['rest1', 'rest2'],status: "active",items: ['item1', 'item2']},
  {listid: 4,name: "Warm Trip Clothing.",longDescription: "A template list for warm trip clothing",category: ['rest1', 'rest2'],status: "locked",items: ['item1', 'item2']},
  {listid: 5,name: "An Old List.",longDescription: "An archived list I don't use anymore",category: ['rest1', 'rest2'],status: "archived",items: ['item1', 'item2']},
  {listid: 6,name: "Meals for Weekend Trip",longDescription: "Breakfast, Lunch, and Dinner for 2.5 days.",category: ['rest1', 'rest2'],status: "locked",items: ['item1', 'item2']},
  
];*/