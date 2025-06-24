import { combineReducers } from "redux";
import AuthReducer from './AuthReducers'


const rootReducer = combineReducers({
    auth:AuthReducer
})

export default rootReducer;