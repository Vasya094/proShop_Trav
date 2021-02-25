import axios from "axios";
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
  PROD_UPDATE_REQ,
  PROD_UPDATE_SUC,
  PROD_UPDATE_FAIL,
  PROD_CREATE_REVIEW_REQ,
  PROD_CREATE_REVIEW_SUC,
  PROD_CREATE_REVIEW_FAIL,
  PROD_TOP_REQ,
  PROD_TOP_SUC,
  PROD_TOP_FAIL,
} from "../constants/productConstants.js";

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PROD_LIST_REQ });
    
    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
    console.log(data)
    dispatch({
      type: PROD_LIST_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROD_DETAILS_REQ });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PROD_DETAILS_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const productDeletee = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROD_DELETE_REQ,
    } );
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: PROD_DELETE_SUC,
    });
  } catch ( error )
  {
    dispatch({
      type: PROD_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROD_CREATE_REQ,
    } );
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.post(`/api/products/`, {}, config);
    dispatch({
      type: PROD_CREATE_SUC,
      payload: data
    });
  } catch ( error )
  {
    dispatch({
      type: PROD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROD_UPDATE_REQ,
    } );
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.put(`/api/products/${product._id}`, product, config);
    dispatch({
      type: PROD_UPDATE_SUC,
      payload: data
    });
  } catch ( error )
  {
    dispatch({
      type: PROD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createReviewProduct = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROD_CREATE_REVIEW_REQ,
    } );
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/products/${productId}/reviews`, review, config);
    dispatch({
      type: PROD_CREATE_REVIEW_SUC
    });
  } catch ( error )
  {
    dispatch({
      type: PROD_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PROD_TOP_REQ });
    
    const { data } = await axios.get(`/api/products/top`);
    console.log(data)
    dispatch({
      type: PROD_TOP_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROD_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
