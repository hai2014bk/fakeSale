export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};


export function fetchCategory(state: State = initialState, action) {
    if (action.type === 'FETCH_CATEGORY_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_CATEGORY_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}


