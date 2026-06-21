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
export async function cancelOrderService({ orderId, userId }) {
    const order = await findOrderById(orderId);
    
    if (!order) {
        throw new Error("Orden no encontrada");
    }

    // Seguridad: Validamos que el usuario logueado sea realmente el dueño del pedido
    if (order.userId.toString() !== userId.toString()) {
        throw new Error("No tienes permisos para cancelar esta orden");
    }

    // Regla de negocio: Si ya cambió de estado (en camino/finalizado), no se toca
    if (order.estado !== "EN PREPARACION") {
        throw new Error("No se puede cancelar una orden que ya está en camino o finalizada");
    }

    // Si pasa los filtros, reutilizamos la función para pasarla a CANCELADO
    return await updateOrderStatus(orderId, "CANCELADO");
}

export async function getOrdersByUserService(userId) {
    return await findOrdersByUser(userId);
}