class DocumentItem {
  public text!: string; // content of the document

  private _state!: DocumentItemState;

  constructor() {
    this.setState(new DraftItemState());
  }

  // manipulation state
  getState(): DraftItemState {
    return this._state;
  }

  setState(state: DraftItemState) {
    this._state = state;
    this._state.item = this;
  }

  //methods for document
  publish() {
    this._state.publish();
  }

  deleteDocument() {
    this._state.delete();
  }
}

//State of document declaration
abstract class DocumentItemState {
  public name!: string;
  private _item!: DocumentItem;

  public set item(item: DocumentItem) {
    this._item = item;
  }

  public get item(): DocumentItem {
    return this._item;
  }

  public abstract publish(): void;
  public abstract delete(): void;
}

//Draft state

class DraftItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = "Draft Document";
  }

  public publish(): void {
    // business logic but now its console.log()
    console.log(
      "Change state to PublishItemState with text: " + this.item.text
    );
    this.item.setState(new PublishItemState());
  }

  public delete(): void {
    // business logic but now its console.log()
    console.log("Delete document from draft");
  }
}

class PublishItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = "Publish Document";
  }

  public publish(): void {
    console.error("This method is not implemented in PublishItemState");
  }
  public delete(): void {
    console.log("Document return to draft state");
    this.item.setState(new DraftItemState());
  }
}

const item = new DocumentItem();
item.text = "New Post";
console.log(item.getState().name);
item.publish();
item.publish();
console.log(item.getState().name);
item.deleteDocument();
console.log(item.getState().name);
