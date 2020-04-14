import {prisma} from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const {userName, email,firstName="", lastName="", bio=""} = args;
            const existsUserName = await prisma.$exists.user({userName});
            const existsEmail = await prisma.$exists.user({email});
            if(existsUserName){
                throw Error("Sorry, Already Someone Using this UserName");
            }
            if(existsEmail){
                throw Error("Sorry, Already Someone Using this Email");
            }
            await prisma.createUser({userName, email,firstName, lastName, bio});
            return true;
        }
    }
};


