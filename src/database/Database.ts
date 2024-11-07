import Database from "@tauri-apps/plugin-sql";

type CmdModel = {
  id?: number;
  title: string;
  description: string;
  command: string;
  keywords: string;
};

export default CmdModel;

class AdbToolsDatabase {
  private db: Database | null = null;

  constructor() {
    this.prepare();
  }

  async prepare() {
    if (this.db) return;
    this.db = await Database.load("sqlite:adbtools.db");
    await this.db.execute(
      "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, command TEXT, keywords TEXT)",
    );
  }

  async search(keywords?: string) {
    await this.prepare();

    let sql = "SELECT * FROM cmd";
    const params = keywords ? [`%${keywords}%`] : [];
    if (keywords) {
      sql += " WHERE keywords LIKE ?";
    }

    return this.db?.select<Array<CmdModel>>(sql, params);
  }

  async update(cmd: CmdModel) {
    await this.prepare();
    await this.db?.execute(
      "UPDATE cmd SET title = ?, description = ?, command = ?, keywords = ? WHERE id = ?",
      [cmd.title, cmd.description, cmd.command, cmd.keywords, cmd.id],
    );
  }

  async insert(cmd: CmdModel) {
    await this.prepare();
    await this.db?.execute(
      "INSERT INTO cmd(title, description, command, keywords) VALUES (?,?,?,?)",
      [cmd.title, cmd.description, cmd.command, cmd.keywords],
    );
  }

  async delete(cmd: CmdModel) {
    await this.prepare();
    await this.db?.execute("DELETE FROM cmd WHERE id = ?", [cmd.id]);
  }
}

const db = new AdbToolsDatabase();

export { db };
