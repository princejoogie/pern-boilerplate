import { createDatabase, dropDatabase } from "typeorm-extension";

async function drop() {
  console.log("dropping database...");
  await dropDatabase();
  await createDatabase();
  console.log("finished dropping and recreating database");
}

drop().catch((err) => console.error(err));
