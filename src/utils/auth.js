const AccessTokenKey = 'ACCESS_TOKEN'
const RefreshTokenKey = 'REFRESH_TOKEN'
// ========== Token 相关 ==========
//从本地获取token
export function getAccessToken() {
    return localStorage.getItem(AccessTokenKey)
}
//保存token 到本地
export function setToken(token) {
    localStorage.setItem(AccessTokenKey, token.accessToken)
    localStorage.setItem(RefreshTokenKey, token.refreshToken)
}
//删除本地token
export function removeToken() {
    localStorage.removeItem(AccessTokenKey)
    localStorage.removeItem(RefreshTokenKey)
}

export function getRefreshToken() {
    return localStorage.getItem(RefreshTokenKey)
}

// =================租户相关 ==============
const TenantNameKey = 'TENANT_NAME'
const TenantIdKey = 'TENANT_ID'
//获取租户名称
export function getTenantName() {
    return localStorage.getItem(TenantNameKey)
}
//获取租户id
export function getTenantId() {
    return localStorage.getItem(TenantIdKey)
}