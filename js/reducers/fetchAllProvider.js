export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};


export function fetchAllProvider(state: State = initialState, action) {
    console.log(action.type)
    if (action.type === 'FETCH_ALL_PROVIDER_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_ALL_PROVIDER_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}


