import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchCategoryProductsSuccess(data) {
	return {
		type: "FETCH_CATEGORY_PRODUCTS_SUCCESS",
		data
	};
}

export function fetchCategoryProductsFailed(error) {
	return {
		type: "FETCH_CATEGORY_PRODUCTS_FAILED",
		error
	};
}

export function fetchCategoryProducts(params) {
	console.log('params',params)
	let url = mConstants.BASE_URL + 'product/?category=' + params.id + '&page=' + params.page
	console.log('api',url)
		return dispatch => {
		APIRequest.APIRequestGET(url, false,
			response => {
                // console.log('response',response)
				dispatch(fetchCategoryProductsSuccess(response));
			},
			error => {
                // console.log('error',error)                
				dispatch(fetchCategoryProductsFailed(error));
			}
		)
	};
}
