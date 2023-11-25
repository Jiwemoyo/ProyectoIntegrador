import { Request, Response } from 'express';
import { sample_users } from '../data';
import { UserModel, User } from '../models/user.models';
import { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } from '../constants/http_status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';


interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        isAdmin: boolean;
    };
}

export const getBase = async (req: Request, res: Response) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        res.send('Base de usuario cargada anteriormente');
        return;
    }

    await UserModel.create(sample_users);
    res.send('Usuarios cargados');
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(HTTP_BAD_REQUEST).send('El email o password no son válidos');
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, address } = req.body;

        // Validar que se proporcionen todos los campos
        if (!name || !email || !password || !address) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'El usuario ya existe, por favor inicie sesión' });
            return;
        }

        // Encriptar la contraseña
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false,
            token: '',
        };

        // Guardar el nuevo usuario en la base de datos
        const dbUser = await UserModel.create(newUser);

        // Enviar una respuesta exitosa
        res.status(200).json({ message: 'Usuario registrado exitosamente', user: dbUser });
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const adminDashboard = async (req: AuthenticatedRequest, res: Response) => {
    if (req.user && req.user.isAdmin) {
        res.send('Bienvenido al panel de control de administrador');
    } else {
        res.status(HTTP_UNAUTHORIZED).send('Acceso no autorizado');
    }
};

export const userProfile = async (req: AuthenticatedRequest, res: Response) => {
    if (req.user) {
        res.send('Bienvenido a tu perfil de cliente');
    } else {
        res.status(HTTP_UNAUTHORIZED).send('Acceso no autorizado');
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.send(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const isValidObjectId = Types.ObjectId.isValid(userId);
        if (!isValidObjectId) {
            throw new Error('El tipo id no es formato correcto de mongosse');
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            res.status(HTTP_BAD_REQUEST).send('Usuario no encontrado');
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { name, email, address } = req.body;
    const userId = req.params.id;

    try {
        const isValidObjectId = Types.ObjectId.isValid(userId);
        if (!isValidObjectId) {
            throw new Error('El tipo id no es formato correcto de mongosse');
        }

        const user = await UserModel.findById(userId);

        if (user) {
            user.name = name;
            user.email = email.toLowerCase();
            user.address = address;

            await user.save();
            res.send(user);
        } else {
            res.status(HTTP_BAD_REQUEST).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const isValidObjectId = Types.ObjectId.isValid(userId);
        if (!isValidObjectId) {
            throw new Error('El tipo id no es formato correcto de mongosse');
        }

        const user = await UserModel.findById(userId);

        if (user) {
            await UserModel.deleteOne({ _id: user._id });
            res.send('Usuario eliminado exitosamente');
        } else {
            res.status(HTTP_BAD_REQUEST).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

const generateTokenResponse = (user: User) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '2d',
        }
    );
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token,
    };
};
