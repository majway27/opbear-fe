import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { List } from './model/list'
import { ListService } from './services/list.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  allLists: Observable<List[]>
  
  activelists: List[];
  lockedlists: List[];
  archivedlists: List[];
  
  errorMessage: String;

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.allLists = this.listService.getAllMyLists();
    this.allLists.subscribe(
      lists => this.activelists = lists.filter(function (el) {return el.status==="active"}),
    );
    this.allLists.subscribe(
      lists => this.lockedlists = lists.filter(function (el) {return el.status==="locked"}),
    );
    this.allLists.subscribe(
      lists => this.archivedlists = lists.filter(function (el) {return el.status==="archived"}),
    );
	}
}