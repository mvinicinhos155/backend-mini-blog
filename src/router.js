import { Router } from "express";
import Cadastro from "./controllers/Cadastro.js";
import Login  from "./controllers/Login.js";
import Post from "./controllers/Post.js";
import Comment from "./controllers/Comment.js";
import Like from "./controllers/Likes.js";

const router = Router();

router.post("/cadastro", Cadastro.create);
router.get("/cadastros", Cadastro.getAll);
router.get("/cadastro/:id", Cadastro.getOne);
router.put("/cadastro/:id", Cadastro.update);
router.delete("/cadastro/:id", Cadastro.delete);

router.post("/login", Login.login)

router.post("/post", Post.create);
router.get("/posts", Post.getAll);
router.delete("/post/:id", Post.delete);

router.post("/comment", Comment.create);

router.post("/like", Like.create);

export default router;