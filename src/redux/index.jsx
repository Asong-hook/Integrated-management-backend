
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'
import global from "./modules/global/reducer";

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	global,
});

// 创建Redux store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;