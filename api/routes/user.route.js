import express from 'express'
import { getUser,
    getUsers,
    updateUser,
    deleteUser, 
    savedPosts} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const Route = express.Router();

Route.get('/',getUsers);   
Route.get('/:id',verifyToken,getUser);
Route.put('/:id',verifyToken,updateUser);
Route.delete('/:id',verifyToken,deleteUser);
Route.post('/save',verifyToken,savedPosts); 

export default Route;