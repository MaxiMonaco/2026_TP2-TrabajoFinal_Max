import {
    findPendingOrders
} from "../data/productionData.js";


export async function getStockService(){


    const orders = await findPendingOrders();


    const stock = {};


    orders.forEach(order=>{


        order.items.forEach(item=>{


            const id = item.productId;


            if(!stock[id]){

                stock[id]={
                    productId:id,
                    nombre:item.nombre,
                    bultos:0,

                };

            }


            stock[id].bultos += item.bultos;




        });


    });



    return Object.values(stock);

}