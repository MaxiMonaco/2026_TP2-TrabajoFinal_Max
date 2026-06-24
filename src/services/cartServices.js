import {
    findCartByUser,
    createCart, 
    updateCart,
    removeItemFromCart,
    clearCart
} from "../data/cartData.js";

import { findProductById } from "../data/productData.js";
import { createOrderService } from "./orderServices.js";


export async function getCartService(userId){

    let cart = await findCartByUser(userId);


    if(!cart){
        await createCart(userId);
        cart = await findCartByUser(userId);
    }


    return cart;
}


export async function addProductToCart(userId, productId, bultos){

    let cart = await findCartByUser(userId);

    if(!cart){
        await createCart(userId);
        cart = await findCartByUser(userId);
    }


    if (bultos <= 0) {
        throw new Error("La cantidad de bultos debe ser mayor a 0");
    }


    const product = await findProductById(productId);


    if(!product){
        throw new Error("Producto no encontrado");
    }


    const existingItem = cart.items.find(
        item => item.productId.toString() === productId
    );


    if(existingItem){

        existingItem.bultos += bultos;

        existingItem.unidadesTotales =
            existingItem.bultos * product.unidadesPorBulto;

        existingItem.subtotal =
            existingItem.unidadesTotales * product.precio;

    } else {


        const unidadesTotales =
            bultos * product.unidadesPorBulto;


        const subtotal =
            unidadesTotales * product.precio;



        const item = {

            productId: product._id,

            nombre: product.nombre,

            bultos,

            unidadesPorBulto: product.unidadesPorBulto,

            unidadesTotales,

            precioUnidad: product.precio,

            subtotal
        };


        cart.items.push(item);
    }



    const total =
        cart.items.reduce(
            (acc,item)=> acc + item.subtotal,
            0
        );


    await updateCart(
        userId,
        cart.items,
        total
    );


    return {
        items: cart.items,
        total
    };
}


export async function removeProductFromCart(userId, productId){

    const cart = await findCartByUser(userId);


    if(!cart){
        throw new Error("Carrito inexistente");
    }


    const item = cart.items.find(
        i => i.productId.toString() === productId
    );


    if(!item){
        throw new Error("Producto no está en el carrito");
    }


    // resta un bulto
    item.bultos -= 1;


    let newItems = cart.items;


    // si llegó a 0, lo sacamos
    if(item.bultos <= 0){

        newItems = cart.items.filter(
            i => i.productId.toString() !== productId
        );

    } else {


        item.unidadesTotales =
            item.bultos * item.unidadesPorBulto;


        item.subtotal =
            item.unidadesTotales * item.precioUnidad;
    }



    const total = newItems.reduce(
        (acc,item)=> acc + item.subtotal,
        0
    );


    await updateCart(
        userId,
        newItems,
        total
    );


    return {
        items:newItems,
        total
    };
}



export async function clearUserCart(userId){

    await clearCart(userId);

    return {
        message:"Carrito vaciado"
    };
}


export async function checkoutService(userId,user){


    const cart = await findCartByUser(userId);


    if(!cart){
        throw new Error("No existe carrito");
    }


    if(cart.items.length === 0){
        throw new Error("El carrito está vacío");
    }


    const order =
        await createOrderService(
            user,
            cart
        );


    await updateCart(
        userId,
        [],
        0
    );


    return {
        message:"Compra realizada exitosamente",
        orderId:order.insertedId,
        total:cart.total
    };

}