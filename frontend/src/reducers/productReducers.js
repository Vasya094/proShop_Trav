import {
  PROD_LIST_REQ,
  PROD_LIST_SUC,
  PROD_LIST_FAIL,
  PROD_DETAILS_REQ,
  PROD_DETAILS_SUC,
  PROD_DETAILS_FAIL,
  PROD_DELETE_REQ,
  PROD_DELETE_SUC,
  PROD_DELETE_FAIL,
  PROD_CREATE_REQ,
  PROD_CREATE_SUC,
  PROD_CREATE_FAIL,
  PROD_CREATE_RESET,
  PROD_UPDATE_REQ,
  PROD_UPDATE_SUC,
  PROD_UPDATE_FAIL,
  PROD_UPDATE_RESET,
  PROD_CREATE_REVIEW_REQ,
  PROD_CREATE_REVIEW_SUC,
  PROD_CREATE_REVIEW_FAIL,
  PROD_CREATE_REVIEW_RESET,
  PROD_TOP_REQ,
  PROD_TOP_SUC,
  PROD_TOP_FAIL,
} from "../constants/productConstants.js";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PROD_LIST_REQ:
      return { loading: true, products: [] };
    case PROD_LIST_SUC:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PROD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = ( state = { product: { reviews: []} }, action ) => {
  switch (action.type) {
    case PROD_DETAILS_REQ:
      return {loading: true, ...state}
    case PROD_DETAILS_SUC:
      return {loading: false, product: action.payload}
    case PROD_DETAILS_FAIL:
      return {loading: false, error: action.payload}
     default:
      return state
  }
}
export const deleteProductReducer = ( state = {} , action ) => {
  switch (action.type) {
    case PROD_DELETE_REQ:
      return {loading: true}
    case PROD_DELETE_SUC:
      return {loading: false, success: true}
    case PROD_DELETE_FAIL:
      return {loading: false, error: action.payload}
     default:
      return state
  }
}
export const createProductReducer = ( state = {} , action ) => {
  switch (action.type) {
    case PROD_CREATE_REQ:
      return {loading: true}
    case PROD_CREATE_SUC:
      return {loading: false, success: true, product: action.payload}
    case PROD_CREATE_FAIL:
      return {loading: false, error: action.payload}
    case PROD_CREATE_RESET:
      return {}
     default:
      return state
  }
}
export const updateProductReducer = ( state = {product: {}} , action ) => {
  switch (action.type) {
    case PROD_UPDATE_REQ:
      return {loading: true}
    case PROD_UPDATE_SUC:
      return {loading: false, success: true, product: action.payload}
    case PROD_UPDATE_FAIL:
      return {loading: false, error: action.payload}
    case PROD_UPDATE_RESET:
      return {product: {}}
     default:
      return state
  }
}
export const createReviewReducer = ( state = {} , action ) => {
  switch (action.type) {
    case PROD_CREATE_REVIEW_REQ:
      return {loading: true}
    case PROD_CREATE_REVIEW_SUC:
      return {loading: false, success: true}
    case PROD_CREATE_REVIEW_FAIL:
      return {loading: false, error: action.payload}
    case PROD_CREATE_REVIEW_RESET:
      return {}
     default:
      return state
  }
}
export const caruselTopReducer = ( state = {products: []} , action ) => {
  switch (action.type) {
    case PROD_TOP_REQ:
      return {loading: true, products: []}
    case PROD_TOP_SUC:
      return {loading: false, products: action.payload}
    case PROD_TOP_FAIL:
      return {loading: false, error: action.payload}
     default:
      return state
  }
}