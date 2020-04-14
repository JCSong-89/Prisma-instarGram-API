import { isAuthenticated } from "../../../middlewares";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
    unFollowing: async (_, args,{requset}) => {
        isAuthenticated(requset);
        const {id} = args;
        const {user} = requset;
        try{
            await prisma.updateUser({
                where:{
                    id: user.id
                },
                data: {
                    disconnect: id
                }
            });
            return true;
        }catch{
            return false;
        }
    }
}
}