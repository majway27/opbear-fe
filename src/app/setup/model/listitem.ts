import { v4 as uuid } from 'uuid';

export class Listitem {
  listitemid: string;
  name: string;
  longDescription: string;
  checked: boolean;
  constructor(name:string, longDescription:string) {
    this.listitemid = uuid();
    this.name = name;
    this.longDescription = longDescription;
    this.checked = false;
  }
};

/*
export class Listitem {
  listid: string;
  name: string;
  longDescription: string;
  categories: {};
  checked: boolean;
  constructor(name:string, longDescription:string) {
    this.listid = uuid();
    this.name = name;
    this.longDescription = longDescription;
    this.checked = false;
  }
};
*/