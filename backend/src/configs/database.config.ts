import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = async () => {
    try {
        await connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log("Base de datos conectada con éxito");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        // Puedes lanzar el error aquí si quieres propagarlo a un nivel superior.
        // throw error;
    }
};
