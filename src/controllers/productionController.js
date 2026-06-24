import {
    getStockService
} from "../services/productionServices.js";


export async function getStock(req,res){

    try{

        const stock =
            await getStockService();


        res.json(stock);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}