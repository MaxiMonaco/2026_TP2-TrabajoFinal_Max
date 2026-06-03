import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/productRoutes", productRoutes.js);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

export default app;
