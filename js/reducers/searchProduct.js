export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: true,
    data: {}
};

export function searchProduct(state: State = initialState, action) {
    if (action.type === 'SEARCH_PRODUCT_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'SEARCH_PRODUCT_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}
