export const updateObject = (state, updateProperty) => {
    return {
        ...state,
        ...updateProperty,
    }
};