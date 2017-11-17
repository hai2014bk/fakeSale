import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchAllproviderSuccess(data) {
	return {
		type: "FETCH_ALL_PROVIDER_SUCCESS",
		data
	};
}

export function fetchAllproviderFailed(error) {
	return {
		type: "FETCH_ALL_PROVIDER_FAILED",
		error
	};
}

export function fetchAllProvider() {
	let url = mConstants.BASE_URL + "getAllprovider"
	console.log('api',url)
		return dispatch => {
		APIRequest.APIRequestGET(url, false,
			response => {
                console.log('response')
				dispatch(fetchAllproviderSuccess(response));
			},
			error => {
                console.log('error')
				dispatch(fetchAllproviderFailed(error));
			}
		)
	};
}