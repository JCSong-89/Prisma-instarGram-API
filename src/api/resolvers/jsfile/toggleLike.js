import { isAuthenticated } from "../../../middlewares"
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, {request}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        },
                        post: {
                            id: postId
                        }
                    }
                ]
            }
            try{const existhingLike = prisma.$exosts.like(filterOptions);
            if(existhingLike){
                await prisma.deleteManyLikes(filterOptions);
            }else{
                await prisma.createLike({user:{
                    connect: {
                        id: user.id
                    }
                },
            post: {
                connect: {
                    id: postId
                }
            }});
            return true
            }}catch{
            return false;}
        }
    }
} 