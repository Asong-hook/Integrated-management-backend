import * as types from "@/redux/mutation-types";
import { listSimpleDictDatas } from '@/api/system/dict'
//获取字典数据
export const loadDictDatas = (token) => {

    return (dispatch) => {
        return new Promise((resolve)=>{
            listSimpleDictDatas().then(response => {
                console.log(response)
                resolve(response)
            })
        })
    }
}