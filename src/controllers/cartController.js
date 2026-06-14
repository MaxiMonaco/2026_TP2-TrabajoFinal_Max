import {
    getCartService,
    addProductToCart,
    removeProductFromCart,
    clearUserCart
} from "../services/cartServices.js";


export async function getCart(req,res){

    try {

        const userId = req.user._id;

        const cart = await getCartService(userId);


        res.json(cart);


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error obteniendo carrito"
        });
    }

}


export async function addProduct(req,res){

    try{


        const userId = req.user._id;

        const {
            productId,
            bultos
        } = req.body;



if(!productId || bultos === undefined){
    return res.status(400).json({
        message:"Faltan datos"
    });
}

if(bultos <= 0){
    return res.status(400).json({
        message:"La cantidad de bultos debe ser mayor a 0"
    });
}



        const cart =
            await addProductToCart(
                userId,
                productId,
                bultos
            );


        res.json(cart);


    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }

}

export async function removeProduct(req,res){

    try{

        const userId = req.user._id;

        const productId = req.params.productId;


        const cart =
            await removeProductFromCart(
                userId,
                productId
            );


        res.json(cart);


    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}



export async function clear(req,res){

    try{

        const userId = req.user._id;


        const result =
            await clearUserCart(userId);


        res.json(result);


    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}