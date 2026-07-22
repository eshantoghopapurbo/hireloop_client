import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";

const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db("hireLoop");

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
    }, 
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",      
        required: false,
        defaultValue: "seeker",
        input: false          
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "seeker_free",
        input: false
      }
    }
  }
});