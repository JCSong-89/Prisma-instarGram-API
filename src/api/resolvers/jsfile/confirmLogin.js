import {token} from "../../utils";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        confirmLogin: async (_, args) => {
            const {email, secret} = args;
            const user = await prisma.user({email});
            if (user.loginSecret === secret){
                await prisma.updateUser({
                    where: {id: user.id},
                    data: {
                        loginSecret: ""
                    }
                }) 
                console.log(token(user.id))
                return token(user.id);
      
            } else {
                throw Error("Wrong email/secret")
            }
        }
    }
}


