import { getDb, connectToDatabase } from "./connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export async function findOrderById(id) {
    const db = getDb();
    const order = await db.collection("orders").findOne({_id: new ObjectId(id)});
    return order;
}