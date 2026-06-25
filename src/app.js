import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import productionRoutes from "./routes/productionRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/production", productionRoutes);


app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {      
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";
    res.status(status).json({ message });
})

export default app;
