import {
    getMyOrders,
    getAllOrders,
    changeOrderStatus,
    removeOrder
} from "../services/orderServices.js";

 
 
export async function myOrders(req,res){

    try{

        const orders =
            await getMyOrders(req.user._id);

        res.json(orders);


    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}




export async function allOrders(req,res){

    try{

        const orders =
            await getAllOrders();

        res.json(orders);

    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}




export async function updateStatus(req,res){

    try{

        const {estado}=req.body;


        await changeOrderStatus(
            req.params.id,
            estado
        );


        res.json({
            message:"Estado actualizado"
        });


    }catch(error){

        res.status(400).json({
            message:error.message
        });
    }
}




export async function deleteOrderController(req,res){

    try{

        await removeOrder(req.params.id);


        res.json({
            message:"Orden eliminada"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}