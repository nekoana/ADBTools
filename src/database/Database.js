import Database from "@tauri-apps/plugin-sql";

const DB = await Database.load("sqlite:adbtools.db");

DB.execute(
  "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, description TEXT,keywords TEXT)"
);

DB.execute(
  "INSERT INTO cmd(title,description,keywords) VALUES ('aaa','aaa','aaa')"
);

async function selectAll() {
  return await DB.execute("SELECT * FROM cmd");
}

export { DB, selectAll };
