import {
    getMyOrders,
    getAllOrders,
    changeOrderStatus,
    removeOrder,
    getOrderById
} from "../services/orderServices.js";


export async function getOrder(req,res){

    try{

        const order = await getOrderById(req.params.id);


        if(!order){
            return res.status(404).json({
                message:"Orden no encontrada"
            });
        }


        // admin puede ver cualquiera
        if(req.user.role === "admin"){
            return res.json(order);
        }


        // usuario dueño
        if(order.userId.toString() !== req.user._id.toString()){

            return res.status(403).json({
                message:"No tenés permiso para ver esta orden"
            });
        }


        res.json(order);


    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}


export async function getOrders(req,res){

    try{

        let orders;

        if(req.user.role === "admin"){

            orders = await getAllOrders();

        } else {

            orders = await getMyOrders(req.user._id);

        }


        res.json(orders);


    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}








export async function updateOrder(req,res){

    try{

        const {estado}=req.body;


        await changeOrderStatus(
            req.params.id,
            estado
        );


        res.json({
            message:"Orden actualizada"
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