
import request from '@/utils/request'
import { getRefreshToken } from '@/utils/auth'
// 刷新访问令牌
export function refreshToken() {
    return request({
        url: '/system/auth/refresh-token?refreshToken=' + getRefreshToken(),
        method: 'post'
    })
}