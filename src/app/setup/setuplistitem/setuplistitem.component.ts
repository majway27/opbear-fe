import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { List } from '../model/list'
import { Listitem } from '../model/listitem'

import { ListService } from '../services/list.service';


@Component({
  selector: 'setuplistitem',
  templateUrl: './setuplistitem.component.html',
  styleUrls: ['./setuplistitem.component.css']
})
export class SetuplistitemComponent implements OnInit {

  listId: string;
  myListObs: Observable<List>
  myList: List;

  liLongDescription: string;
  liName: string;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private location: Location,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.getListItems(this.listId);
  }
  
  getListItems(listId:string): void {
    console.log("Starting list item get")
    //this.myListObs = this.listService.getMyList(listId);
    const myListItems$ = this.listService.getMyList(listId);
    myListItems$.subscribe(
      result => {
          this.setListHelper(result.data);
          console.log(result);
        },
        error => {
          console.log(error);
        }
    );
  }
  
  copyMyListItem(listItemId:string) {
    const list = this.listBuildHelper();
    list.copyListItem(listItemId);
    const network$ = this.listService.updateMyList(list);
      network$.subscribe(
        () => this.successHelper("List Updated"),
        err => this.errorHelper(err));
  }
  
  renameMyListItem(listItemId:string, name:string, longDescription: string) {
    const list = this.listBuildHelper();
    list.renameListItem(listItemId, name, longDescription);
    const network$ = this.listService.updateMyList(list);
      network$.subscribe(
        () => this.successHelper("List Updated"),
        err => this.errorHelper(err));
  }
  
  onCheckListItemChange(evt:any, listItemId:string) {
    console.log('Checked value changed for: ' + listItemId);
    console.log('Box is: ' + evt.checked);
	  console.log(evt);
    const list = this.listBuildHelper();
    list.checkListItem(listItemId, evt.checked);
    const network$ = this.listService.updateMyList(list);
      network$.subscribe(
        () => this.successHelper("List Updated"),
        err => this.errorHelper(err));
  }
  
  deleteMyListItem(listId:string) {
    const list = this.listBuildHelper();
    list.deleteListItem(listId);
    const network$ = this.listService.updateMyList(list);
      network$.subscribe(
        () => this.successHelper("List Updated"),
        err => this.errorHelper(err));
  }
  
  openAddListItemDialog(): void {
    let dialogRef = this.dialog.open(DialogAddSetupListItem, {
      width: '240px',
      data: { name: this.liName, longDescription: this.liLongDescription }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      let list = this.addListItemHelper(result);
      const network$ = this.listService.updateMyList(list);
      network$.subscribe(
        () => this.successHelper("List Updated"),
        err => this.errorHelper(err));
    });
  }
  
  openRenameListItemDialog(listitem:Listitem): void {
    let dialogRef = this.dialog.open(DialogRenameSetupListItem, {
      width: '240px',
      data: { name: listitem.name, longDescription: listitem.longDescription }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.renameMyListItem(listitem.listitemid, result.name, result.longDescription);
    });
  }
  
  /*onChkChange(evt:any, listItemId:string) {
    //console.log('Checked value changed for: ' + listItemId);
    //console.log('Box is: ' + evt.checked);
	  //console.log(evt);
	  this.setCheckListItemChecked(listItemId:string, evt.checked);
  }*/
  
  goBack(): void {
    this.location.back();
  }
  
  private listBuildHelper() {
    const newTargetList = new List(this.myList.name, this.myList.longDescription);
    newTargetList.listid = this.myList.listid;
    newTargetList.status = this.myList.status;
    newTargetList.listitems = this.myList.listitems;
    return newTargetList
  }
  private addListItemHelper(result: any) {
    const list = this.listBuildHelper();
    const myNewListItem = new Listitem(result.name,result.longDescription);
    list.addListItem(myNewListItem);
    return list;
  }
  private setListHelper(list: List) {
    this.myList = list;
  }
  private successHelper(message:string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      panelClass: ['ob-snack-bar-color'],
      duration:700
    });
    this.getListItems(this.listId);
  }
  private errorHelper(err:any) {
    this.getListItems(this.listId);
    alert(err);
  }

}

@Component({
  selector: 'dialog-add-setup-list-item',
  templateUrl: './dialog-add-setup-list-item.component.html'
})
export class DialogAddSetupListItem {

  constructor(
    public dialogRef: MatDialogRef<DialogAddSetupListItem>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClickAddList(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-rename-setup-list-item',
  templateUrl: './dialog-rename-setup-list-item.component.html'
})
export class DialogRenameSetupListItem {

  constructor(
    public dialogRef: MatDialogRef<DialogRenameSetupListItem>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClickAddList(): void {
    this.dialogRef.close();
  }

}