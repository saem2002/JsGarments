import AddUser from "./AddUser";
import CartQuantity, {CartQuantitystatechange}  from "./CartQuantity";



import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    AddUser,CartQuantity,CartQuantitystatechange
})
export default rootReducer;