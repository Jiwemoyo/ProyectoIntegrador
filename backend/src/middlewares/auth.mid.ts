import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    if (!token) return res.status(HTTP_UNAUTHORIZED).send();

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!) as any;
        req.user = decodedUser;
        //const user = { ...decodedUser, isAdmin: decodedUser.isAdmin };
        //req.user = user;

    } catch (error) {
        console.log("algo anda mal")
        return res.status(HTTP_UNAUTHORIZED).send("Token inválido o expirado");
        
    }

    return next();
};
