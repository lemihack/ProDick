import { MongoClient } from "./deps.ts";
const client = new MongoClient();

client.connectWithUri(Deno.env.get("Mongo_URI")!);

//oU0WrVHNMhThJNkB


const db = client.database("deno_survey");

export const userCollection = db.collection('user');
