import {prisma} from "../../../../generated/prisma-client";

export default {
    Subscription: {
        newMessage: {
            subscribe: (_, args) => {
                const {rommId} = args;
                return prisma.$subscribe.message({
                    AND: [
                        {mutation_in: "CREATED"},
                        {
                            node: {
                                    room: {id: rommId}
                            }
                        }
                    ]
                })
                .node();
            },
            resolve: payload => payload
        }
    }
}