import {produce} from "immer";
import * as types from "@/redux/mutation-types";

const globalState = {
	dictDatas: {},
};

const dic = (state = globalState,action) => produce(state, draftState => {
    switch (action.type) {
        case types.SET_DICT_DATA:
            draftState.dictDatas = action.payload;
            break;
        default:
            return draftState;
    }
});
export default dic;