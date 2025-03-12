import api from "../data/axiosInstance";
export const setCategories = (categories) => ({ type: "SET_CATEGORIES", payload: categories });
export const setProductList = (productList) => ({ type: "SET_PRODUCT_LIST", payload: productList });
export const setTotal = (total) => ({ type: "SET_TOTAL", payload: total });
export const setFetchState = (state) => ({ type: "SET_FETCH_STATE", payload: state });
export const setLimit = (limit) => ({ type: "SET_LIMIT", payload: limit });
export const setOffset = (offset) => ({ type: "SET_OFFSET", payload: offset });
export const setFilter = (filter) => ({ type: "SET_FILTER", payload: filter });

export const fetchCategories = () => async (dispatch) => {
    dispatch(setFetchState("FETCHING")); // Dispatch FETCHING state before API call
    try {
        const response = await api.get("/categories");
        dispatch(setCategories(response.data));
        dispatch(setFetchState("FETCHED")); // Dispatch FETCHED state on success
    } catch (error) {
        console.error("Kategoriler alınırken hata oluştu:", error);
        dispatch(setFetchState("FAILED")); // Dispatch FAILED state on error
    }
};