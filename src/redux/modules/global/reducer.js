import {produce} from "immer";
import * as types from "@/redux/mutation-types";

const globalState = {
	token: 0,
};

const global = (state = globalState,action) => produce(state, draftState => {
    switch (action.type) {
        case types.ADD:
            draftState.token = action.payload + draftState.token;
            break;
        default:
            return draftState;
    }
});
export default global;