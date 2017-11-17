import { combineReducers } from "redux";

import { searchProduct } from "./searchProduct"
import { fetchCategory } from "./fetchCategory"
import { fetchCategoryProducts } from "./fetchCategoryProducts"
import { fetchAllProvider } from "./fetchAllProvider"



export default combineReducers({
	searchProduct,
	fetchCategory,
	fetchCategoryProducts,
	fetchAllProvider
});
