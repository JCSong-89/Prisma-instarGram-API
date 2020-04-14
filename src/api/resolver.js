import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

// 하위 폴더 JS파일을 모두 읽어옴
const resolversArray = fileLoader(path.join(__dirname, './resolvers/**/*.js'), { extensions: ['.js'] });


export default mergeResolvers(resolversArray);
