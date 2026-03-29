import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let connectionLogged = false;

function shouldLogConnection(): boolean {
  return (
    process.env.NODE_ENV === "development" || process.env.MONGODB_LOG_CONNECTION === "1"
  );
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(new Error("MONGODB_URI is not configured"));
  }
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect().then((c) => {
      if (shouldLogConnection() && !connectionLogged) {
        connectionLogged = true;
        const dbHint = process.env.MONGODB_DB_NAME?.trim() || "(default DB from URI)";
        console.info(`[mongodb] Connected successfully — using database: ${dbHint}`);
      }
      return c;
    });
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const c = await getClientPromise();
  const name = process.env.MONGODB_DB_NAME?.trim();
  return name ? c.db(name) : c.db();
}
