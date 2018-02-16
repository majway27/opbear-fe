import { List } from "./list";

export class SetupListCommand {
  commandValue: string;
  commandListObject: List;
  constructor(commandValue, commandListObject) {
    this.commandValue = commandValue;
    this.commandListObject = commandListObject;
  }
}