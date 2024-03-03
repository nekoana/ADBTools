import Database from "@tauri-apps/plugin-sql";
import CmdModel from "../model/CmdModel";

class AdbToolsDatabase {
  constructor() {}

  async load(url) {
    this.db = await Database.load(url);
  }

  async init() {
    if (this.db) return;
    this.load("sqlite:adbtools.db");

    this.execute(
      "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, description TEXT,command TEXT, keywords TEXT)"
    );
  }

  async selectAll() {
    await this.init();

    const result = await db.select("SELECT * FROM cmd");
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

  async insert({ title, description, command, keywords }) {
    await this.init();

    return await db.execute(
      "INSERT INTO cmd(title,description,command,keywords) VALUES (?,?,?,?)",
      [title, description, command, keywords]
    );
  }
}

const db = new AdbToolsDatabase();

export { db };
