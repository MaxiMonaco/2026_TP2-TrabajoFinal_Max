import {
    createOrder,
    findOrdersByUser,
    findAllOrders,
    updateOrderStatus,
    deleteOrder,
    findOrderById,
    updateOrder
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
    ];


    if(!estados.includes(estado)){
        throw new Error("Estado inválido");
    }


    return await updateOrderStatus(id, estado);

}

export async function editOrderService(id, items){

    const order = await findOrderById(id);


    if(!order){
        throw new Error("Orden no encontrada");
    }


    if(order.estado === "FINALIZADO"){
        throw new Error(
            "No se puede modificar una orden finalizada"
        );
    }


    const total = items.reduce(
        (acc,item)=> acc + item.subtotal,
        0
    );


    return await updateOrder(
        id,
        {
            items,
            total
        }
    );
}

export async function cancelOrderService(id,user){


    const order = await findOrderById(id);


    if(!order){
        throw new Error("Orden no encontrada");
    }


    if(order.estado === "FINALIZADO"){
        throw new Error(
            "No se puede cancelar una orden finalizada"
        );
    }
    if(order.estado === "CANCELADO"){
        throw new Error(
            "La orden ya esta cancelada"
        );
    }



    const esAdmin =
        user.role === "admin";


    const esDueño =
        order.userId.toString() === user._id.toString();


    if(!esAdmin && !esDueño){
        throw new Error(
            "No tiene permisos para cancelar esta orden"
        );
    }


    return await updateOrderStatus(
        id,
        "CANCELADO"
    );
}

export async function removeOrder(id){

    return await deleteOrder(id);

}