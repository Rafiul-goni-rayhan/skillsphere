import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("skillsphere");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { client } from "@/db"; // your mongodb client
// export const auth = betterAuth({
//   //...other options
//   emailAndPassword: { 
//     enabled: true, 
//   }, 
//   socialProviders: { 
//     github: { 
//       clientId: process.env.GITHUB_CLIENT_ID , 
//       clientSecret: process.env.GITHUB_CLIENT_SECRET, 
//     }, 
//   }, 
// });


// 

// export const auth = betterAuth({
//     database: mongodbAdapter(client),
// });