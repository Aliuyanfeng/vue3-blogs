import { Request } from '@/utils/request';


export function login(parameter: any) {
    return Request.axiosInstance({
        url: '/test',
        method: 'post',
        data: parameter
    })
}

export function test() {
    return Request.axiosInstance({
        url: '/test',
        method: 'get'
    })
}

export function getBaseInfo() {
    return Request.axiosInstance({
        url: "/getBaseInfo",
        method: "get"
    })
}