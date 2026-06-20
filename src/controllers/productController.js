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
        // page/limit llegan como strings desde req.query; MongoDB exige enteros
        // en skip()/limit(). Parseamos igual que getAllUsers.
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { category } = req.query;
        const data = await getProducts({ page, limit, category });
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
        const { nombre, categoria, precio, unidadesPorBulto, imagen } = req.body;

        if (!nombre || !categoria || precio === undefined || unidadesPorBulto === undefined || !imagen) {
            return res.status(400).json({
                message: "Faltan campos obligatorios"
            });
        }

if (precio !== undefined && precio <= 0) {
    return res.status(400).json({
        message: "El precio debe ser mayor a 0"

    });
}

if (unidadesPorBulto !== undefined && unidadesPorBulto <= 0) {
    return res.status(400).json({
        message: "Las unidades por bulto deben ser mayores a 0"
    });
}

        const result = await createProductService(req.body);

        res.status(201).json({
            message: "El producto se ha creado exitosamente",
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
        const { nombre, categoria, precio, unidadesPorBulto, imagen } = req.body;

const hasAtLeastOneField =
    nombre !== undefined ||
    categoria !== undefined ||
    precio !== undefined ||
    unidadesPorBulto !== undefined ||
    imagen !== undefined;

        if (!hasAtLeastOneField) {
            return res.status(400).json({
                message: "Debe enviar al menos un campo para actualizar"
            });
        }


        if (precio !== undefined && precio <= 0) {
            return res.status(400).json({
                message: "El precio debe ser mayor a 0"
            });
        }

        if (unidadesPorBulto !== undefined && unidadesPorBulto <= 0) {
            return res.status(400).json({
                message: "Las unidades por bulto deben ser mayores a 0"
            });
        }

        const product = await updateProductService(req.params.id, req.body);

        res.json({
            message: "Producto actualizado",
            product
        });

    } catch (error) {
        console.error("Error updating product:", error.message);

        res.status(error.status || 500).json({
            message: error.message
        });
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