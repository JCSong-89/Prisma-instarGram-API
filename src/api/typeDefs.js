import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';


const typesArray = fileLoader(path.join(__dirname, './typeDefs/*.graphql'))

module.exports = mergeTypes(typesArray, { all: true })