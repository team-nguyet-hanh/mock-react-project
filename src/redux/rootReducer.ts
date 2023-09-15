import { combineReducers } from "redux";
import authReducer from './authen/authSlice';
import registerReducer from './register/registerSlice'
import { articleData } from "./article/articleReducer";


export default combineReducers({
    auth: authReducer,
    register: registerReducer,
    articleData
});
