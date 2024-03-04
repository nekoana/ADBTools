import Database from "@tauri-apps/plugin-sql";
import CmdModel from "../model/CmdModel";

class AdbToolsDatabase {
  constructor() {}

  async load(url) {
    this.db = await Database.load(url);
  }

  async init() {
    if (this.db) return;

    await this.load("sqlite:adbtools.db");

    await this.db.execute(
      "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, description TEXT,command TEXT, keywords TEXT)"
    );
  }

  async selectAll() {
    await this.init();

    const result = await this.db.select("SELECT * FROM cmd");
    return result.map((item) => {
      return new CmdModel(
        item.id,
        item.title,
        item.description,
        item.command,
        item.keywords
      );
    });
  }

  async update(cmd) {
    await this.init();

    return await this.db.execute(
      "UPDATE cmd SET title = ?, description = ?, command = ?, keywords = ? WHERE id = ?",
      [cmd.title, cmd.description, cmd.command, cmd.keywords, cmd.id]
    );
  }

  async insert({ title, description, command, keywords }) {
    await this.init();

    return await this.db.execute(
      "INSERT INTO cmd(title,description,command,keywords) VALUES (?,?,?,?)",
      [title, description, command, keywords]
    );
  }

  async delete(cmd) {
    await this.init();

    return await this.db.execute("DELETE FROM cmd WHERE id = ?", [cmd.id]);
  }
}

const db = new AdbToolsDatabase();

export { db };
