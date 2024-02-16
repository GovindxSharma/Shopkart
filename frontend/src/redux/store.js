
import { configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import  {productReducer}  from './reducers/product/productReducer';
import { productDetailsReducer } from './reducers/product/productDetailsReducer';
import { userLoginReducer } from './reducers/user/userReducer';
import { profileReducer } from './reducers/user/profileReducer';
import { forgotPasswordReducer } from './reducers/user/forgotPassword';
import { cartReducer } from './reducers/cart/cartReducers';
import { newOrderReducer } from './reducers/order/newOrder';
import { myOrderReducer } from './reducers/order/myOrder';
import { orderDetailsReducer } from './reducers/order/orderDetails';
import { newReviewReducer } from './reducers/reviews/newReview';
import { adminProductReducer } from './reducers/admin/adminProducts';
import { allOrderAdminReducer } from './reducers/admin/adminAllOrders';
import { allUsersAdminReducer } from './reducers/admin/adminAllUser';
import { newProductReducer } from './reducers/admin/adminNewProduct';





const store = configureStore({
  reducer: {
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userLoginReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    adminProducts:adminProductReducer,
    adminOrders:allOrderAdminReducer,
    adminUsers:allUsersAdminReducer,
    newProduct:newProductReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

});




export default store;