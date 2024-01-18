import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import global from "./modules/global/reducer";
import auth from "./modules/auth/reducer";
import dic from "./modules/dic/reducer";
import user from "./modules/user/reducer";
import permission from "./modules/permission/reducer";

// 创建reducer(拆分reducer)
const reducer = combineReducers({
  global,
  auth,
  dic,
  user,
  permission,
});

// 创建Redux store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
