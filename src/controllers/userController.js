import { getUsers, getUserByID, registerUserService, loginUserService,deleteUserService, registerAdminService  } from "../services/userServices.js";
import jwt from "jsonwebtoken";

export async function getAllUsers(req, res){
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = await getUsers({ page, limit });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getUser(req, res) {
    try {

        const requestedId = req.params.id;

        const loggedUser = req.user;


        const isAdmin = loggedUser.role === "admin";

        const isOwner =
            loggedUser._id.toString() === requestedId;


        if(!isAdmin && !isOwner){
            return res.status(403).json({
                message:"No tiene permisos para ver este usuario"
            });
        }


        const user = await getUserByID(requestedId);


        if(!user){
            return res.status(404).json({
                message:"Usuario no encontrado"
            });
        }


        res.json(user);


    } catch (error) {

        console.error("Error fetching users: ", error);

        res.status(500).json({
            message:"Internal server error"
        });
    }
}

export async function registerUserController(req, res){
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: "Faltan campos obligatorios (name, email, password)"});
    }

    try {
        const result = await registerUserService({name, email, password});
        res.status(201).json({message: "Usuario registrado exitosamente", userId: result.insertedId});
    } catch (error) {
        if(error.message === "El email ya esta registrado"){
            return res.status(409).json({message: error.message});
        }
        console.error("Error registrando usuario: ", error);
        res.status(500).json({message: "Error interno al registrar usuario"});
    }
}

export async function loginUserController(req, res) {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Faltan campos obligatorios (email, password)"});
    }

    try {
        const user = await loginUserService({email, password});
        const token = jwt.sign(
            {_id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
            }, 
            process.env.JWT_SECRET, 
            {expiresIn: "2h"}
        );
        res.json({message: "Login exitoso", user, token});
    } catch (error) {
        if(error.message === "Credenciales inválidas"){
            return res.status(401).json({message: error.message});
        }
        console.error("Error en login: ", error);
        res.status(500).json({message: "Error interno en login"});
    }
}

export async function deleteUserController(req, res) {
    const { id } = req.params;
    try {
        const userToDelete = await getUserByID(id);
        
        if (!userToDelete) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (userToDelete.role === "admin") {
            return res.status(403).json({ 
                message: "Acceso denegado. Un administrador no puede eliminar a otro administrador." 
            });
        }

        const result = await deleteUserService(id);
        res.json({ message: `Usuario ${userToDelete.name} eliminado exitosamente` });
        
    } catch (error) {
        console.error("Error eliminando usuario: ", error);
        res.status(500).json({ message: "Error interno al eliminar usuario" });
    }
}

export async function registerAdminController(req, res) {
    const { name, email, password } = req.body;
    
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Faltan campos obligatorios (name, email, password)" });
    }

    try {
        const result = await registerAdminService({ name, email, password });
        res.status(201).json({ message: "Administrador registrado exitosamente", userId: result.insertedId });
    } catch (error) {
        
        if (error.message === "El email ya esta registrado") {
            return res.status(409).json({ message: error.message });
        }
        console.error("Error registrando administrador: ", error);
        res.status(500).json({ message: "Error interno al registrar administrador" });
    }
}
