import { getDb } from "./connection.js";


export async function findPendingOrders(){

    const db = getDb();


    return await db.collection("orders")
        .find({
            estado:{
                $in:[
                    "EN PREPARACION"
                ]
            }
        })
        .toArray();

}