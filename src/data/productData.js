import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

// GET ALL
export async function findAllProducts({ page = 1, limit = 10, category, brand } = {}) {
    const db = getDb();

    const skip = (page - 1) * limit;

    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await db.collection("products")
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray();

    return products;
}

// GET BY ID
export async function findProductById(id) {
    const db = getDb();

    return await db.collection("products").findOne({
        _id: new ObjectId(id)
    });
}

// INSERT
export async function insertProduct(product) {
    const db = getDb();

    const newProduct = {
        ...product
    };

    const result = await db.collection("products").insertOne(newProduct);

    return result;
}

// UPDATE (replace)
export async function replaceProduct(id, product) {
    const db = getDb();

    const result = await db.collection("products").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: product },
        { returnDocument: "after" }
    );

    // 🔥 FIX REAL: usar result.matchedCount + result.value
    if (result.matchedCount === 0) {
        return null;
    }

    return result.value;
}

// DELETE
export async function removeProduct(id) {
    const db = getDb();

    const result = await db.collection("products").deleteOne({
        _id: new ObjectId(id)
    });

    return result.deletedCount > 0;
}