export class List {
  uid: string;
  listid: number;
  name: string;
  longDescription: string;
  category: {};
  status: string;
  items: {};
  constructor(name:string, longDescription:string) {
    this.name = name;
    this.longDescription = longDescription;
  }
};

/*export interface List {
  uid: string;
  listid: number;
  name: string;
  longDescription: string;
  category: {};
  status: string;
  items: {};
};*/

/*export class List {
  uid: string;
  listid: string;
  name: string;
  constructor() { 
  }
};*/