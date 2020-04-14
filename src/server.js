import "./env";
import {GraphQLServer} from "graphql-yoga";
import logger from 'morgan';
import typeDefs from './api/typeDefs';
import resolvers from './api/resolver';
import {makeExecutableSchema} from 'graphql-tools';
import "./possport";
import {authenticateJwt} from './possport';
import { isAuthenticated } from "./middlewares";


const PORT = process.env.PORT || 4000;
// shema type GraphQL file + resolver JS file join
const schema = makeExecutableSchema({ typeDefs, resolvers }); 
// making GraphQL Server 
const server = new GraphQLServer({
    schema,   
    context: ({ request }) => ({ request, isAuthenticated })
});



server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({port: PORT}, () => console.log(`Server running ${PORT}`) );


