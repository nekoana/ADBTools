import Database from "@tauri-apps/plugin-sql";
import CmdModel from "../model/CmdModel";

const db = await Database.load("sqlite:adbtools.db");

db.execute(
  "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, description TEXT,command TEXT, keywords TEXT)"
);

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
