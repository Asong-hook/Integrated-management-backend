import * as types from "@/redux/mutation-types";
import { listSimpleDictDatas } from "@/api/system/dict";

//获取字典数据
export const loadDictDatas = () => {
  return (dispatch) => {
    listSimpleDictDatas().then((res) => {
      console.log(res);
      // 如果未加载到数据，则直接返回
      if (!res || !res.data) {
        return;
      }
      // 设置数据
      const dictDataMap = {};
      res.data.forEach((dictData) => {
        // 获得 dictType 层级
        const enumValueObj = dictDataMap[dictData.dictType];
        if (!enumValueObj) {
          dictDataMap[dictData.dictType] = [];
        }
        // 处理 dictValue 层级
        dictDataMap[dictData.dictType].push({
          value: dictData.value,
          label: dictData.label,
          colorType: dictData.colorType,
          cssClass: dictData.cssClass,
        });
      });
      // 存储到 Redux 中
      dispatch({
        type: types.SET_DICT_DATA,
        payload: dictDataMap,
      });
    });
  };
};
