import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';

import { List } from './model/list'
import { SetupListCommand } from './model/setupListCommand'

import { ListService } from './services/list.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  allListsObs: Observable<List[]>
  
  activelists: List[];
  lockedlists: List[];
  archivedlists: List[];

  errorMessage: String;
  
  longDescription: string;
  name: string;

  constructor(
    private listService: ListService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.refreshList();
    
    this.name="";
    this.longDescription="";
	}
	
	refreshList() {
	  this.allListsObs = this.listService.getAllMyLists();
    this.allListsObs.subscribe(
      lists => this.activelists = lists.filter(function (el) {return el.status==="active"}),
    );
    this.allListsObs.subscribe(
      lists => this.lockedlists = lists.filter(function (el) {return el.status==="locked"}),
    );
    this.allListsObs.subscribe(
      lists => this.archivedlists = lists.filter(function (el) {return el.status==="archived"}),
    );
	}
	
	openAddListDialog(): void {
    let dialogRef = this.dialog.open(DialogAddSetupList, {
      width: '240px',
      data: { name: this.name, longDescription: this.longDescription }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      let myNewList = new List(result.name,result.longDescription);
      this.createList(myNewList);
    });
  }
  
  openRenameListDialog(targetList: List, callback: any) {
    let dialogRef = this.dialog.open(DialogRenameSetupList, {
      width: '240px',
      data: { name: targetList.name, longDescription: targetList.longDescription }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      targetList.name = result.name;
      targetList.longDescription = result.longDescription;
      callback.updateList(targetList);
    });
    
  }
  
  listStatusChange(command:SetupListCommand) {
    switch(command.commandValue) {
      
      case "lock": {
        command.commandListObject.status = "locked";
        this.lockedlists.push(command.commandListObject);
        this.pruneList(this.activelists, command.commandListObject.listid);
        let network$ = this.listService.updateList(command.commandListObject);
        network$.subscribe(
            //() => console.log('HTTP put successful'),
            () => this.successHelper("List Locked"),
            err => this.errorHelper(err))
      } break;
      
      case "unLock": {
        command.commandListObject.status = "active";
        this.activelists.push(command.commandListObject);
        this.pruneList(this.lockedlists, command.commandListObject.listid);
        let network$ = this.listService.updateList(command.commandListObject);
        network$.subscribe(
            //() => console.log('HTTP put successful'),
            () => this.successHelper("List Unlocked"),
            err => this.errorHelper(err))
      } break;
        
      case "archive": {
        command.commandListObject.status = "archived";
        this.archivedlists.push(command.commandListObject);
        try {
          this.pruneList(this.activelists, command.commandListObject.listid);
          this.pruneList(this.lockedlists, command.commandListObject.listid);
        }
        catch(e) {
          // One of the above will be empty, ignore
        }
        let network$ = this.listService.updateList(command.commandListObject);
        network$.subscribe(
            //() => console.log('HTTP put successful'),
            () => this.successHelper("List Archived"),
            err => this.errorHelper(err));
      } break;
        
      case "unArchive": {
        command.commandListObject.status = "active";
        this.activelists.push(command.commandListObject);
        this.pruneList(this.archivedlists, command.commandListObject.listid);
        let network$ = this.listService.updateList(command.commandListObject);
        network$.subscribe(
            //() => console.log('HTTP put successful'),
            () => this.successHelper("List Un-Archived"),
            err => this.errorHelper(err));
      } break;
        
      case "copy": {
        // New names for copy
        const newName = "Copy of " + command.commandListObject.name;
        const newLongDescription = "Copy of " + command.commandListObject.longDescription;
        const copyList = new List(
          newName, 
          newLongDescription);
        // Create
        this.activelists.push(copyList);
        let network$ = this.listService.createList(copyList);
        network$.subscribe(
            //() => console.log('HTTP post successful'),
            () => this.successHelper("List Copied"),
            err => this.errorHelper(err));
      } break;
        
      case "phasersSetToKill": {
        this.pruneList(this.archivedlists, command.commandListObject.listid);
        let network$ = this.listService.deleteList(command.commandListObject.listid);
        network$.subscribe(
            //() => console.log('HTTP Delete successful'),
            () => this.successHelper("List Deleted"),
            err => this.errorHelper(err));
      } break;
        
      case "rename": {
        this.openRenameListDialog(command.commandListObject, this);
      } break;
      
      default: {
        alert("Error: Unknown Command Value Passed")
        } break;
    }
  }
  
  private createList(myNewList: List) {
      this.activelists.push(myNewList);
      const network$ = this.listService.createList(myNewList);
      network$.subscribe(
        () => this.successHelper("List Created"),
        err => this.errorHelper(err));
  }
  private updateList(targetList: List) {
      switch(targetList.status) {
        case "active": {
          this.pruneList(this.activelists, targetList.listid);
          this.activelists.push(targetList);
        } break;
        case "locked": {
          this.pruneList(this.lockedlists, targetList.listid);
          this.activelists.push(targetList);
        } break;
        case "archived": {
          this.pruneList(this.archivedlists, targetList.listid);
          this.activelists.push(targetList);
        } break;
      }
      const network$ = this.listService.updateList(targetList);
      network$.subscribe(
        () => this.successHelper("List Updated"),
        err => this.errorHelper(err));
  }
  private pruneList(lists:List[], listid: string) {
        let index = lists.findIndex(list => list.listid === listid); //find index in your array
        lists.splice(index, 1);//remove element from array
  }
  private successHelper(message:string) {
    let snackBarRef = this.snackBar.open(message, 'Close', {
      panelClass: ['ob-snack-bar-color'],
      duration:700
    });
    this.refreshList();
  }
  private errorHelper(err:any) {
    this.refreshList();
    alert(err);
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

@Component({
  selector: 'dialog-rename-setup-list',
  templateUrl: './dialog-rename-setup-list.component.html'
})
export class DialogRenameSetupList {

  constructor(
    public dialogRef: MatDialogRef<DialogRenameSetupList>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClickAddList(): void {
    this.dialogRef.close();
  }

}