import request from '@/utils/request'
// 查询全部字典数据列表
export function listSimpleDictDatas() {
    console.log("接口")
    return request({
        url: '/system/dict-data/list-all-simple',
        method: 'get',
    })
}