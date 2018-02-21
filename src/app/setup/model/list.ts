import { v4 as uuid } from 'uuid';
import { Listitem } from './listitem'

export class List {
  uid: string;
  listid: string;
  name: string;
  longDescription: string;
  category: {};
  status: string;
  listitems: any[];
  
  constructor(name:string, longDescription:string) {
    this.listid = uuid();
    this.name = name;
    this.longDescription = longDescription;
    this.status = "active";
    this.listitems = [];
  }
  
  addListItem(li:Listitem) {
    this.listitems.push(li);
  }
  
  copyListItem(liId:string) {
    let index = this.listitems.findIndex(listitems => listitems.listitemid === liId);
    let newItemValues = this.listitems[index]
    let newListItem = new Listitem(
      "Copy of " + newItemValues.name,
      "Copy of " + newItemValues.longDescription
      );
    this.listitems.push(newListItem);
  }
  
  renameListItem(liId:string, newName: string, newLongDescription: string) {
    let index = this.listitems.findIndex(listitems => listitems.listitemid === liId);
    const name = newName || this.listitems[index].name;
    const longDescription = newLongDescription || this.listitems[index].longDescription;
    this.listitems[index].name = newName;
    this.listitems[index].longDescription = newLongDescription;
  }
  
  checkListItem(liId:string, checkedState:boolean) {
    let index = this.listitems.findIndex(listitems => listitems.listitemid === liId);
    this.listitems[index].checked = checkedState;
  }
  
  deleteListItem(liId:string) {
    let index = this.listitems.findIndex(listitems => listitems.listitemid === liId);
    this.listitems.splice(index, 1);
  }
  
};