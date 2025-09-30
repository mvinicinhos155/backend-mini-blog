import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LikeController {
    async create(req, res ) {
        const { like, postId, authorId } = req.body;

        const newLike = await prisma.like.create({data: {like, postId, authorId}});

        if(!newLike) {
            return res.status(400).json({error: "Erro ao criar like"});
        }

        return res.status(200).json({message: "Like criado com sucesso!", newLike})
    }
}

export default new LikeController();