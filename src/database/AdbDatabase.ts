import Database from "@tauri-apps/plugin-sql";

export type Cmd = {
  id?: number;
  title: string;
  description: string;
  command: string;
  keywords: string;
};

class AdbDatabase {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  static async prepare() {
    const db = await Database.load("sqlite:adbtools.db");
    await db.execute(
      "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, command TEXT, keywords TEXT)",
    );
    return new AdbDatabase(db);
  }

  async search(keywords?: string) {
    let sql = "SELECT * FROM cmd";
    const params = keywords ? [`%${keywords}%`] : [];
    if (keywords) {
      sql += " WHERE keywords LIKE ?";
    }

    return this.db?.select<Array<Cmd>>(sql, params);
  }

  async update(cmd: Cmd) {
    await this.db?.execute(
      "UPDATE cmd SET title = ?, description = ?, command = ?, keywords = ? WHERE id = ?",
      [cmd.title, cmd.description, cmd.command, cmd.keywords, cmd.id],
    );
  }

  async insert(cmd: Cmd) {
    await this.db?.execute(
      "INSERT INTO cmd(title, description, command, keywords) VALUES (?,?,?,?)",
      [cmd.title, cmd.description, cmd.command, cmd.keywords],
    );
  }

  async delete(cmd: Cmd) {
    await this.db?.execute("DELETE FROM cmd WHERE id = ?", [cmd.id]);
  }
}
const DB = await AdbDatabase.prepare();

export { DB };
