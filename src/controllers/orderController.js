import {
    getMyOrders,
    getAllOrders,
    changeOrderStatus,
    removeOrder,
    getOrderById,
    createOrderService, // NUEVO
    cancelOrderService
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

export async function createOrderController(req, res) {
    try {
        const cart = req.body; 
        
        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({ message: "El carrito no puede estar vacío" });
        }

        
        const result = await createOrderService(req.user, cart);
        
        res.status(201).json({
            message: "Orden creada exitosamente",
            orderId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function cancelOrderController(req, res) {
    try {
        const orderId = req.params.id;
        const userId = req.user._id; 

        await cancelOrderService({ orderId, userId });

        res.json({ message: "Orden cancelada correctamente" });
    } catch (error) {
        
        if (error.message === "Orden no encontrada") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "No tienes permisos para cancelar esta orden" || 
            error.message === "No se puede cancelar una orden que ya está en camino o finalizada") {
            return res.status(403).json({ message: error.message });
        }
        
        res.status(500).json({ message: "Error interno al cancelar la orden" });
    }
}

export async function getOrdersByUserAdminController(req, res) {
    try {
        const { userId } = req.params;

        const orders = await getOrdersByUserService(userId);

        res.json({
            usuarioId: userId,
            total_pedidos: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}