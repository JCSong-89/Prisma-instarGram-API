import { isAuthenticated } from "../../../middlewares"
import { ROOM_FRAGMENT } from "../../../fragmenets";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (_, args, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            const {roomId, message, to} = args;
            let room;
            if(roomId === undefined){
                if(user.id !== to){
                 room = await prisma.createRomm({
                    participants: {
                        conmect: [{
                            id: to
                        },
                    {id: user.id}]
                    }
                })
                .$fragment(ROOM_FRAGMENT);
                }else {
                    room = await prisma.room({id: roomId}).$fragment(ROOM_FRAGMENT); 

                }
                if(!room){
                    throw Error("Room not Found")
                }
                const getTo = room.participants.filter(
                    participant => participant.id !== user.id)[0];
                return await prisma.createMessage({
                        text: message,
                    from:{
                        connect: {id: user.request}
                    },
                    to: {
                        connect: {
                            id: roomId ?  getTo.id : to 
                        }
                    },
                    room: {
                        connect: {
                            id: room.id

                        }
 
                   }
                });
            }           
        }
    }
}