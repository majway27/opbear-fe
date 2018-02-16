import { Component, EventEmitter, Input, Output } from '@angular/core';

import { List } from '../model/list'
import { SetupListCommand } from '../model/setupListCommand'

@Component({
  selector: 'setuplist',
  templateUrl: './setuplist.component.html',
  styleUrls: ['./setuplist.component.css'],
})
export class SetuplistComponent {

  @Input() lists: List[];
  @Output() listAction = new EventEmitter<SetupListCommand>();

  changeListCommand(
    commandvalue:string, 
    list:List) {
      // Basically pass back "up" to parent component \
      // a command and a list object to do it to
      const command = new SetupListCommand(commandvalue,list);
      this.listAction.emit(command);
  }
  
}
