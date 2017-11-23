import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchCategorySuccess(data) {
	return {
		type: "FETCH_CATEGORY_SUCCESS",
		data
	};
}

export function fetchCategoryFailed(error) {
	return {
		type: "FETCH_CATEGORY_FAILED",
		error
	};
}

export function fetchCategory(params) {
	let url = mConstants.BASE_URL + 'category/?provider=' + params
		return dispatch => {
		APIRequest.APIRequestGET(url, false,
			response => {
				console.log("response")
				dispatch(fetchCategorySuccess(response));
			},
			error => {
				dispatch(fetchCategoryFailed(error));
			}
		)
	};
}
