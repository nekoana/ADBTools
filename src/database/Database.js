import Database from "@tauri-apps/plugin-sql";
import CmdModel from "../model/CmdModel";

class AdbToolsDatabase {
  constructor() {
    this.load("sqlite:adbtools.db");
  }

  async load(url) {
    this.db = await Database.load(url);
  }

  async init() {
    this.execute(
      "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, description TEXT,command TEXT, keywords TEXT)"
    );
  }

  async execute(sql, params) {
    return await this.db.execute(sql, params);
  }

  async select(sql, params) {
    return await this.db.select(sql, params);
  }
}

const db = new AdbToolsDatabase();

async function selectAll() {
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

async function insert({ title, description, command, keywords }) {
  return await db.execute(
    "INSERT INTO cmd(title,description,command,keywords) VALUES (?,?,?,?)",
    [title, description, command, keywords]
  );
}

export { selectAll, insert };
