import {
    createOrder,
    findOrdersByUser,
    findAllOrders,
    updateOrderStatus,
    deleteOrder,
    findOrderById
} from "../data/orderData.js";
import { ObjectId } from "mongodb";

 
export async function createOrderService(user, cart){

    const order = {

        userId:new ObjectId(user._id),

        usuario:{
            nombre:user.name,
            email:user.email
        },

        items:cart.items,

        total:cart.total,

        estado:"EN PREPARACION",

        fecha:new Date()
    };


    return await createOrder(order);
}

export async function getOrderById(id){

    return await findOrderById(id);

}

export async function getMyOrders(userId){

    return await findOrdersByUser(userId);

}



export async function getAllOrders(){

    return await findAllOrders();

}



export async function changeOrderStatus(id, estado){

    const estados=[
        "EN PREPARACION",
        "EN CAMINO",
        "FINALIZADO",
        "CANCELADO"
    ];


    if(!estados.includes(estado)){
        throw new Error("Estado inválido");
    }


    return await updateOrderStatus(id, estado);

}



export async function removeOrder(id){

    return await deleteOrder(id);

}