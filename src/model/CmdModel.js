class CmdModel {
  constructor(id, title, description, command, keywords) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.command = command;
    this.keywords = keywords;
  }

  update(title, description, command, keywords) {
    return new CmdModel(this.id, title, description, command, keywords);
  }
}

export default CmdModel;
