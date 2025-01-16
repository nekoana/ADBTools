import Database from "@tauri-apps/plugin-sql";

const config: {
  version: number;
  migrations: Array<{
    version: number;
    up: (DB: Database) => Promise<void>;
  }>;
} = {
  version: 0,
  migrations: [],
};

export async function loadDatabase() {
  const DB = await Database.load("sqlite:adbtools.db");

  await DB.execute(
    "CREATE TABLE IF NOT EXISTS cmd (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, command TEXT, keywords TEXT)",
  );

  //check database version
  let { version } = await DB.select<{ version: number }>("PRAGMA user_version");
  //migration
  const migrations = config.migrations.filter(
    (migration) => version < migration.version,
  );
  try {
    for (const migration of migrations) {
      await migration.up(DB);
      version = migration.version;
      await DB.execute("PRAGMA user_version = ?", [version]);
    }
  } catch (error) {
    console.error("Migration error", error);
  }

  return DB;
}
