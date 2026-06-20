import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";


export async function createOrder(order){

    const db = getDb();

    return await db.collection("orders")
        .insertOne(order);
}

export async function findOrderById(id){

    const db = getDb();

    return await db.collection("orders")
        .findOne({
            _id: new ObjectId(id)
        });
}
 

export async function findOrdersByUser(userId){

    const db = getDb();

    return await db.collection("orders")
        .find({
            userId:new ObjectId(userId)
        })
        .toArray();
}


export async function findAllOrders(){

    const db = getDb();

    return await db.collection("orders")
        .find()
        .toArray();
}


export async function updateOrderStatus(id, estado){

    const db = getDb();

    return await db.collection("orders")
        .updateOne(
            {
                _id:new ObjectId(id)
            },
            {
                $set:{
                    estado
                }
            }
        );
}


export async function deleteOrder(id){

    const db = getDb();

    return await db.collection("orders")
        .deleteOne({
            _id:new ObjectId(id)
        });
}