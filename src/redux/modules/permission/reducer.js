import { produce } from "immer";
import * as types from "@/redux/mutation-types";

const globalState = {
    routes: [],
};

const permission = (state = globalState, action) => produce(state, draftState => {
    switch (action.type) {
        case types.SET_MENUS:
            draftState.routes = action.payload;
            break;
        default:
            return draftState;
    }
});
export default permission;