import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.models";
import asyncHandler from 'express-async-handler';


const router = Router();

router.get("/base", asyncHandler(
    async (req, res) => {
       const usersCount = await UserModel.countDocuments();
       if(usersCount> 0){
         res.send("Base de usuario cargada anteriormente");
         return;
       }
   
       await UserModel.create(sample_users);
       res.send("Usuarios cargados");
   }
   ))

router.post("/login", asyncHandler(
    async(req,res) => {
        const {email, password} = req.body;
        const user = sample_users.find(user => user.email == email &&
            user.password == password);
    
            if(user){
                res.send(generateTokenResponse(user));
            }else{
                res.status(400).send(" El email o password no es valido!");
            }
    }
))

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"SomeRandomText", {
        expiresIn:"30d"
    })

    user.token = token;
    return user;
}
export default router;