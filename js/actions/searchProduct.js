import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function searchProductSuccess(data) {
	return {
		type: "SEARCH_PRODUCT_SUCCESS",
		data
	};
}

export function searchProductFailed(error) {
	return {
		type: "SEARCH_PRODUCT_FAILED",
		error
	};
}

export function searchProduct(params) {
	console.log("qweqweqw", params)
	let url = mConstants.BASE_URL + 'search/?page=' + params.page 
	return dispatch => {
		APIRequest.APIRequestPOST(url,params, false,
			response => {
				dispatch(searchProductSuccess(response));
			},
			error => {
				dispatch(searchProductFailed(error));
			}
		)
	};
}
