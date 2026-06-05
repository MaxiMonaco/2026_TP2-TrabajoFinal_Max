import {
    findAllProducts,
    findProductById,
    insertProduct,
    replaceProduct,
    removeProduct
} from "../data/productData.js";

// GET ALL
export async function getProducts(query) {
    return await findAllProducts(query);
}

// GET BY ID
export async function getProductById(id) {
    return await findProductById(id);
}

// CREATE
export async function createProductService(productData) {
    return await insertProduct(productData);
}

// UPDATE
export async function updateProductService(id, productData) {
    const updated = await replaceProduct(id, productData);

    if (!updated) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
    }

    return updated;
}

// DELETE
export async function deleteProductService(id) {
    const deleted = await removeProduct(id);

    if (!deleted) {
        throw new Error("Producto no encontrado");
    }

    return deleted;
}