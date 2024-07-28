import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { getPosts,getPost,addPost,updatePost,deletePost } from "../controllers/posts.controller.js";
const route = express.Router();

route.get('/', getPosts );
route.get('/:id', getPost);
route.post('/', verifyToken, addPost );
route.put('/:id',verifyToken, updatePost );
route.delete('/:id',verifyToken, deletePost );


export default route