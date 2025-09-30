import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient(); 


class CadastroController {
   async create(req, res ) {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await bcrypt.compare(password, hashedPassword);
    const usuario = await prisma.cadastro.create({data: {name, email, password: hashedPassword}});

    if(!usuario){
        return res.status(400).json({error: "Erro ao registrar usuario"});
    }
    return res.status(201).json({message: "Usuario registrado com sucesso", usuario});

   }


   async getAll(req, res ) {
    const usuarios = await prisma.cadastro.findMany();
    if(!usuarios) {
        return res.status(400).json({erro: "Nunhum usuario encontrado!!"});
    }

    return res.status(200).json({message: "Usuarios encontrados com sucesso!", usuarios});
   }

   async getOne(req, res ) {
    const { id } = req.params;

    const Oneget = await prisma.cadastro.findUnique({
        where: {id: Number(id)},
        include: {
            posts: true
        }});

    if(!Oneget) {
        return res.status(400).json({error: "Usuario não encontrado"});
    }

    return res.status(200).json(Oneget);
   }

   async update(req, res ) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const edit = await prisma.cadastro.update({where: {id: Number(id)}, data: {name, email, password}} );

    if(!edit) {
        return (res.status(400).json({error: "Erro ao autualizar usuario"}))
    }

    return res.status(200).json({message: "Usuario atualizado com sucesso!", edit});
   }

   async delete(req, res ) {
    const { id } = req.params;

    const getOne = await prisma.cadastro.findUnique({where: {id: Number(id)}});
    const del = await prisma.cadastro.delete({where: {id: Number(id)}});

    if(!del) {
        return res.status(400).json({error: "Erro ao deletar usuario"})
    }

    return res.status(200).json({message: "Usuario deletado com sucesso!", getOne})
   }
}

export default new CadastroController();
