import { v4 as uuid } from 'uuid';

export class List {
  uid: string;
  listid: string;
  name: string;
  longDescription: string;
  category: {};
  status: string;
  items: {};
  constructor(name:string, longDescription:string) {
    this.listid = uuid();
    this.name = name;
    this.longDescription = longDescription;
    this.status = "active"
  }
};