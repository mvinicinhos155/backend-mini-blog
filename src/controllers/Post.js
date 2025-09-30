import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


class PostController {
    async create(req, res) {
        const { title, content, authorId } = req.body;
        const post = await prisma.post.create({data: {title, content, authorId}});

        if(!post) {
            return res.status(400).json({message: "Erro ao criar post"});
        }

        return res.status(200).json({message: "Post criado com sucesso!", post})
    }

    async getAll(req, res) {
        const get = await prisma.post.findMany({
            include: {
                author: true,
                comments: true,
                likes: true
            }
        });

        if(!get) {
            return res.status(400).json({error: "Nenhum post encontrado"});
        }

        return res.status(200).json({message: "Posts encontrados com sucesso!", get});
    }

    async delete (req, res) {
        const { id } = req.params;
        const get = await prisma.post.findUnique({where: {id: Number(id)}});
        const del = await prisma.post.delete({where: {id: Number(id)}});

        if(!del) {
            return res.status(400).json({error: "Erro ao deletar post"});
        }

        return res.status(200).json({message: "Post deletado com sucesso!", get})
    }
}

export default new PostController();
