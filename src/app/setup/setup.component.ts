import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  
  longDescriptionr: string;
  namer: string;

  constructor(
    private listService: ListService,
    public dialog: MatDialog
    ) { }

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
	
	openAddListDialog(): void {
    let dialogRef = this.dialog.open(DialogAddSetupList, {
      width: '250px',
      data: { name: this.namer, longDescription: this.longDescriptionr }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.namer = result.name;
      this.longDescriptionr = result.longDescription;
      let myNewList = new List(result.name,result.longDescription);
      this.createList(myNewList);
    });
  }
  
  
  createList(myNewList: List) {
      this.listService.createList(myNewList);
      this.activelists.push(myNewList);
  }
	
}

@Component({
  selector: 'dialog-add-setup-list',
  templateUrl: './dialog-add-setup-list.component.html'
})
export class DialogAddSetupList {

  constructor(
    public dialogRef: MatDialogRef<DialogAddSetupList>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClickAddList(): void {
    this.dialogRef.close();
  }

}