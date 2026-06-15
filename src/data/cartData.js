import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";


// buscar carrito del usuario
export async function findCartByUser(userId){

    const db = getDb();

    return await db.collection("carts")
        .findOne({
            userId: new ObjectId(userId)
        });
}


// crear carrito vacío
export async function createCart(userId){

    const db = getDb();

    const cart = {
        userId: new ObjectId(userId),
        items: [],
        total: 0
    };


    const result = await db.collection("carts")
        .insertOne(cart);


    return result;
}


// actualizar carrito
export async function updateCart(userId, items, total){

    const db = getDb();


    return await db.collection("carts")
        .updateOne(
            {
                userId:new ObjectId(userId)
            },
            {
                $set:{
                    items,
                    total
                }
            }
        );
}

// eliminar producto del carrito
export async function removeItemFromCart(userId, productId){

    const db = getDb();

    return await db.collection("carts")
        .updateOne(
            {
                userId: new ObjectId(userId)
            },
            {
                $pull:{
                    items:{
                        productId:new ObjectId(productId)
                    }
                }
            }
        );
}



// vaciar carrito completo
export async function clearCart(userId){

    const db = getDb();

    return await db.collection("carts")
        .updateOne(
            {
                userId:new ObjectId(userId)
            },
            {
                $set:{
                    items:[],
                    total:0
                }
            }
        );
}