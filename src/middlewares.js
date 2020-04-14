export const isAuthenticated = request => {
    if (!request.user){
        throw Error("You need to log in");
    }
    return;
}

