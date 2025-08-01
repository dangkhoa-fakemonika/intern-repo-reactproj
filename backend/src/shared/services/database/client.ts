import{ MongoClient } from "mongodb";
const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@mycluster.vfjxwbs.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster`;

export const client = new MongoClient(uri);
