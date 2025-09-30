import { PrismaClient } from "@prisma/client";
import  JWT  from "jsonwebtoken";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();


class LoginController {
    async login (req, res) {
        const { email, password } = req.body;
        const log = await prisma.cadastro.findUnique({where: {email}});

        if(!log) {
            return res.status(400).json({error: "Usuario ou senha invalidas"});
        }

        const validation = await bcrypt.compare(password, log.password);
        if(!validation) {
            return res.status(400).json({error: "Usuario ou senha invalidas"});
        }

        const jwt = JWT.sign({id: log.id, email: log.email}, process.env.JWT_SECRET, {expiresIn: "1d"});

        return res.status(200).json({message: "Login Realizado com sucesso!", log, jwt})
    }
}

export default new LoginController();