import { isAuthenticated } from "../../../middlewares"
import { ROOM_FRAGMENT } from "../../../fragmenets";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRoom: async (_,__, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            return await prisma.rooms({
                where:{
                    participants_some: {
                        id: user.id
                    }
                }
            }).$fragment(ROOM_FRAGMENT)
        }
    }
}