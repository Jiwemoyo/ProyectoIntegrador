import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.models";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../constant/http_status";
import bcrypt from 'bcryptjs'

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
                res.status(HTTP_BAD_REQUEST).send(" El email o password no es valido!");
            }
    }
))
router.post('/register', asyncHandler(
    async (req, res) => {
      const {name, email, password, address} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(HTTP_BAD_REQUEST)
        .send('Usuario ya existe, desea logearse')
        return;
      }
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser:User = {
        id:'',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
      }
  
      const dbUser = await UserModel.create(newUser);
      res.send(generateTokenResponse(dbUser));
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