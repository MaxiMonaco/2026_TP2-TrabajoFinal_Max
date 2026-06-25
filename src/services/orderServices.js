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
import { findProductById } from "../data/productData.js";

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



export async function getAllOrders(page, limit, estado){

    return await findAllOrders({
        page,
        limit,
        estado
    });

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


    const nuevosItems = [];


    for(const item of items){

        const product = await findProductById(
            item.productId
        );


        if(!product){
            throw new Error(
                "Producto no encontrado"
            );
        }


        const unidadesTotales =
            item.bultos * product.unidadesPorBulto;


        const subtotal =
            unidadesTotales * product.precio;



        nuevosItems.push({

            productId: product._id,

            nombre: product.nombre,

            bultos:item.bultos,

            unidadesPorBulto:
                product.unidadesPorBulto,

            unidadesTotales,

            precioUnidad:
                product.precio,

            subtotal,

            ...(item.detalle && {
                detalle:item.detalle
            })

        });
    }



    const total =
        nuevosItems.reduce(
            (acc,item)=>acc + item.subtotal,
            0
        );



    return await updateOrder(
        id,
        {
            items:nuevosItems,
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