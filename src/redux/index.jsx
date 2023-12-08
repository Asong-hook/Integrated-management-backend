
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'
import global from "./modules/global/reducer";
import auth from './modules/auth/reducer'

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	global,
	auth
});

// 创建Redux store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;