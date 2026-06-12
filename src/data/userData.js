import { getDb, connectToDatabase } from "./connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export async function findAllUsers({ page = 1, limit = 10 } = {}) {
    const db = getDb();
    const skip = (page - 1) * limit;
    const users = await db.collection("users")
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();
    return users;
}

export async function findUserById(id) {
    const db = getDb();
    const user = await db.collection("users").findOne({_id: new ObjectId(id)});
    return user;
}

export async function registerUser({name, email, password}){
    const db = getDb();
    const existingUser = await db.collection("users").findOne({email});
    if(existingUser) {
        throw new Error("El email ya esta registrado");        
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
        name,
        email,
        role : "user", 
        password: hashedPassword

    };
    console.log("Nuevo usuario registrado:", newUser);
    const result = await db.collection("users").insertOne(newUser);
    return result;
}

export async function findByCredentials(email, password){
    const db = getDb();
    const user = await db.collection("users").findOne({email});
    if(!user){
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return null;
    }
    return user;
}