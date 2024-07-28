import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"

export const getUsers = async (req,res) =>{
    try{
        
        const users = await prisma.user.findMany();
        res.status(200).json(users)

    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Failed to get Users"})
    }
}

export const getUser =  async (req,res) =>{

    const id = req.params.id; 
 
    try{
        const user = await prisma.user.findUnique({
            where : {id},
        })

        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Failed to get User"})
    }
}



export const updateUser = async (req,res) =>{

    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password ,avatar, ...otherInputs} = req.body;

    if( id !== tokenUserId){
        return res.status(403).json({message : " Not Authorized ! "});
    }

    let updatedPassword = null;

    try{
        if(password){
            updatedPassword = await bcrypt.hash(password , 10);
        }

        const updatedUser = await prisma.user.update({
            where : {id},
            data : {
                ...otherInputs,
                ...(updatedPassword && {password : updatedPassword}),
                ...(avatar && {avatar})
            },
        })

        const {password : userPassword , ...rest} = updatedUser

        return res.status(200).json(rest)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Failed to Update Users"})
    }
}

export const deleteUser = async(req,res) =>{

    const id = req.params.id;
    const tokenUserId = req.userId;

    if( id !== tokenUserId){
        return res.status(403).json({message : " Not Authorized ! "});
    }

    try{
        await prisma.user.delete({
            where : {id}
        })
        res.status(200).json({message: " User Deleted Successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Failed to delete Users"})
    }
}

export const savedPosts = async(req,res) =>{

    const postId = req.body.postId;
    const tokenUserId = req.userId;

    console.log(tokenUserId);
    console.log(postId);

    try{
       const savedPost = await prisma.savedPost.findUnique({
        where : {
            userId_postId:{
                userId : tokenUserId,
                postId, 
            },
        }
       })

       if(savedPost){
        await prisma.savedPost.delete({
            where : {
                id : savedPost.id,
            },
        })
        res.status(200).json({message: " Post removed from saved list "})
       }

       else {
        await prisma.savedPost.create({
            data : {
                where : {
                    postId,
                    userId :tokenUserId,
                }
            }
            
        })

        return res.status(200).json({message : " Post Saved "})
       }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Failed to get saved posts"})
    }
}