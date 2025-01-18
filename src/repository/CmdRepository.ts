import Database from "@tauri-apps/plugin-sql";
import { Cmd } from "@/model/Cmd";
import { loadDatabase } from "@/database/AdbDatabase";

interface ICmdRepository {
  search(keywords?: string): Promise<Array<Cmd>>;
  update(cmd: Cmd): Promise<void>;
  insert(cmd: Cmd): Promise<void>;
  delete(cmd: Cmd): Promise<void>;
}

class CmdRepository implements ICmdRepository {
  private db: Database | undefined;

  constructor() {}

  private async getDB() {
    if (!this.db) {
      this.db = await loadDatabase();
    }
    return this.db;
  }

  async search(keywords?: string) {
    const db = await this.getDB();
    let sql = "SELECT * FROM cmd";
    const params = keywords ? [`%${keywords}%`] : [];
    if (keywords) {
      sql += " WHERE keywords LIKE ?";
    }

    return db.select<Array<Cmd>>(sql, params);
  }

  async update(cmd: Cmd) {
    const db = await this.getDB();
    await db.execute(
      "UPDATE cmd SET title = ?, description = ?, command = ?, keywords = ? WHERE id = ?",
      [cmd.title, cmd.description, cmd.command, cmd.keywords, cmd.id],
    );
  }

  async insert(cmd: Cmd) {
    const db = await this.getDB();
    await db.execute(
      "INSERT INTO cmd(title, description, command, keywords) VALUES (?,?,?,?)",
      [cmd.title, cmd.description, cmd.command, cmd.keywords],
    );
  }

  async delete(cmd: Cmd) {
    const db = await this.getDB();
    await db.execute("DELETE FROM cmd WHERE id = ?", [cmd.id]);
  }
}

export default CmdRepository;
