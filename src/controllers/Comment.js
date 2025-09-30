import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentController {
    async create(req, res) {
        const { constent, postId, authorId } = req.body;
        
        const commet = await prisma.comment.create({data: {constent, postId, authorId}});

        if(!commet) {
            return res.status(400).json({error: "Erro ao criar comentario"});
        }

        return res.status(200).json({message: "Comentario criado com sucesso!", commet});
    }
}

export default new CommentController();