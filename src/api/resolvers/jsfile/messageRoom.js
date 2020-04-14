import { isAuthenticated } from "../../../middlewares"
import { ROOM_FRAGMENT } from "../../../fragmenets";
import {prisma} from "../../../../generated/prisma-client";


export default {
    Query: {
        messageRoom: async (_,arg, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            const {id} = arg;
            const canSee = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            });
            if(canSee){
                return await prisma.room({id}).$fragment(ROOM_FRAGMENT);
            }else{
                throw Error("You can't see messages");
            }
        } 
    }
}