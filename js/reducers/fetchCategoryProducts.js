export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};


export function fetchCategoryProducts(state: State = initialState, action) {
    if (action.type === 'FETCH_CATEGORY_PRODUCTS_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_CATEGORY_PRODUCTS_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}


