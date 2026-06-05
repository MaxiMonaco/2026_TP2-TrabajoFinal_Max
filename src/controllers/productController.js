import {
    getProducts,
    getProductById,
    createProductService,
    updateProductService,
    deleteProductService
} from "../services/productServices.js";

// GET ALL
export async function getAll(req, res) {
    try {
        const data = await getProducts(req.query);
        res.json(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// GET BY ID
export async function getById(req, res) {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// CREATE
export async function create(req, res) {
    try {
        const result = await createProductService(req.body);

        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: result.insertedId
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error interno al crear producto" });
    }
}

// UPDATE
export async function update(req, res) {
    try {
        const result = await updateProductService(req.params.id, req.body);

        res.json({
            message: "Producto actualizado",
            product: result
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error interno al actualizar producto" });
    }
}

// DELETE
export async function remove(req, res) {
    try {
        const deleted = await deleteProductService(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error interno al eliminar producto" });
    }
}