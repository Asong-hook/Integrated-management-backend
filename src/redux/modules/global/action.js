import * as types from "@/redux/mutation-types";

export const a = (token) => {
    return (dispatch) => {
        setTimeout(()=>{
            dispatch({
                type: types.ADD,
                payload:token
            })
        },1000)
    }
}
export const setToken = (token) => ({
	type: types.ADD,
	payload:token
});