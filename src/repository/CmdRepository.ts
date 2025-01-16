import Database from "@tauri-apps/plugin-sql";
import { Cmd } from "@/model/Cmd";

interface ICmdRepository {
  search(keywords?: string): Promise<Array<Cmd>>;
  update(cmd: Cmd): Promise<void>;
  insert(cmd: Cmd): Promise<void>;
  delete(cmd: Cmd): Promise<void>;
}

class CmdRepository implements ICmdRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
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

export default CmdRepository;
