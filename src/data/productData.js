import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

//falta el filtro por brand
export function findAllProducts({ page = 1, limit = 10,category, brand } = {}) {
    const db = getDb();
    const skip = (page - 1) * limit;
    const users = await db.collection("products")
        .find(category ? { categories:category} : {})
        .skip(skip)
        .limit(limit)
        .toArray();
    return products;
}

export function findProductById(id) {
    const db = getDb();
    const product = await db.collection("products").findOne({_id: new ObjectId(id)});
    return product;
}

//modificar la busqueda por id?
export function insertProduct({id,name, category,brand,cost}) {
    const db = getDb();
    const existingProduct = await db.collection("product").findOne({id});
    if(existingProduct) {
        throw new Error("El producto ya existe");        
    }
    const newProduct = { 
        name,
        category,
        brand,
        cost
     };
    const result = await db.collection("products").insertOne(newProduct);
    return result;
}

//MODIFICAR
export function replaceProduct(id, product) {
    const db = getDb();
    const product = await db.collection("products").findOne({_id: new ObjectId(id)});
    if(!existingProduct) {
        throw new Error("El producto no existe");        
    }
    //////
    //mockProducts[index] = { id, ...product };
    /////
    return product;
}

//MODIFICAR
export function removeProduct(id) {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return false;
    mockProducts.splice(index, 1);
    return true;
}