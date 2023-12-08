import axios from 'axios'
import { getAccessToken, getTenantId } from '@/utils/auth'

const proxy = 'http://api-dashboard.yudao.iocoder.cn';

// 创建axios实例
const service = axios.create({
    baseURL: proxy + '/admin-api/',
    // 超时
    timeout: 30000,
    // 禁用 Cookie 等信息
    withCredentials: false,
})

// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getAccessToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getAccessToken();
    }
    // 设置租户
    const tenantId = getTenantId();
    if (tenantId) {
        config.headers['tenant-id'] = tenantId;
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            const part = encodeURIComponent(propName) + '='
            if (value !== null && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        let params = propName + '[' + key + ']';
                        const subPart = encodeURIComponent(params) + '='
                        url += subPart + encodeURIComponent(value[key]) + "&";
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(async res => {
    console.log(res)
})

export default service