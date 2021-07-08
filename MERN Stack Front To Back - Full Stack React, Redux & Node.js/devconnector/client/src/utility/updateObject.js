export const updateObject = (oldObj, data) => {
    return {
        ...oldObj,
        ...data,
    };
};
