export const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    // console.log('%cLOGGER: ', 'color: red');
    // console.log('%ctype: ', 'color: green', action.type);
    // console.log('%cpayload: ', 'color: green', action.payload);
    // console.log('%ccurrentState: ', 'color: green', store.getState());


    next(action);

    // console.log('%cnext state: ', 'color: green', store.getState());
};