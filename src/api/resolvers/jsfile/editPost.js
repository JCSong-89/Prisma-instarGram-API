import { isAuthenticated } from "../../../middlewares"
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editPost: (_, args, {request}) => {
            isAuthenticated(request);
            const {id, caption, location, action} = args;
            const {user} = request;
            const post = prisma.$exists.post({id, user: {id: user.id}});
            if(post){
                if(action === "EDIT")
                {
                return prisma.updatePost({
                    data: {
                        caption, location
                    },
                    where: {
                        id
                    }
                })
                }
                else{
                    return prisma.deletePost({id});
                }
            }else{
                throw Error("You cant do that");
            }
           

        }
    }
}