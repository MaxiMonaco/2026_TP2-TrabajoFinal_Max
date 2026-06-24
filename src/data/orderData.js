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


export async function findAllOrders({page = 1, limit = 10, estado} = {}){

    const db = getDb();

    const skip = (page - 1) * limit;
    const filter = {};
        if(estado){
        filter.estado = estado;
    }

    return await db.collection("orders")
        .find(filter)
        .sort({
            fecha:-1
        })
        .skip(skip)
        .limit(limit)
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

export async function updateOrder(id, data){

    const db = getDb();

    return await db.collection("orders")
        .updateOne(
            {
                _id:new ObjectId(id)
            },
            {
                $set:data
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