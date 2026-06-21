import {
    getMyOrders,
    getAllOrders,
    changeOrderStatus,
    removeOrder,
    getOrderById,
    cancelOrderService,
    editOrderService
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



//para que el admin edite las ordenes de los tontos que hagan pedido mal
export async function editOrder(req,res){

    try{

        const {items}=req.body;


        if(!items){
            return res.status(400).json({
                message:"Debe enviar items"
            });
        }


        await editOrderService(
            req.params.id,
            items
        );


        res.json({
            message:"Orden modificada"
        });


    }catch(error){

        res.status(400).json({
            message:error.message
        });
    }
}


//para que el admin cambie el estado segun avance el pedido
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


export async function cancelOrder(req,res){

    try{

        await cancelOrderService(
            req.params.id,
            req.user
        );


        res.json({
            message:"Orden cancelada"
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