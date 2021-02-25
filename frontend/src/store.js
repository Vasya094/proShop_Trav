import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer,
  createReviewReducer,
  caruselTopReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers.js";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducer.js";

const reducer = combineReducers( {
  productList: productListReducer,
  productDetails: productDetailsReducer, 
  productDelete: deleteProductReducer,
  productCreate: createProductReducer,
  productUpdate: updateProductReducer,
  productReview: createReviewReducer,
  caruselTop: caruselTopReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
} )

const cartItemFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
 ? JSON.parse(localStorage.getItem("userInfo"))
 : null;
const shippingInfoFromLocalStorage = localStorage.getItem("shippingAddress")
 ? JSON.parse(localStorage.getItem("shippingAddress"))
 : {};
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
 ? JSON.parse(localStorage.getItem("paymentMethod"))
 : '';


const initialState = {
  cart: {
    cartItems: cartItemFromLocalStorage,
    shippingAddress: shippingInfoFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage
  },
 userLogin: {userInfo: userInfoFromLocalStorage}
}

const middleware = [thunk]

const store = createStore( reducer, initialState, composeWithDevTools( applyMiddleware( ...middleware  ) ) )

export default store