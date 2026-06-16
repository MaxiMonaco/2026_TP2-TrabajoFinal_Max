import { findAllUsers, findByCredentials, findUserById, registerUser,deleteUserFromDB,registerAdmin } from "../data/userData.js";

export async function getUsers({ page, limit } = {}){
    return await findAllUsers({ page, limit });
}

export async function getUserByID(id){
    return await findUserById(id);
}

export async function registerUserService({name, email, password}){
    try {
       return await registerUser({name, email, password});
    } catch (error) {
        if(error.message === "El email ya esta registrado"){
            throw error;            
        }
        throw new Error("Error al registrar el usuario");        
    }
}

export async function loginUserService({email, password}){
    const user = await findByCredentials(email, password);
    if(!user){
        throw new Error("Credenciales inválidas");        
    }
    const {password: _pw, ...userWithoutPassword} = user;
    return userWithoutPassword;
}

export async function deleteUserService(id){
    try {
        return await deleteUserFromDB(id);
    } catch (error) {
        console.error("Error REAL en la capa de datos:", error.message);
        throw error; 
    }
}

export async function registerAdminService({name, email, password}){
    try {
       return await registerAdmin({name, email, password});
    } catch (error) {
        if(error.message === "El email ya esta registrado"){
            throw error;            
        }
        throw new Error("Error al registrar el administrador");        
    }
}