import { Request } from '@/utils/request';

// 测试登陆接口
export function login(parameter: any) {
    return Request.axiosInstance({
        url: '/test',
        method: 'post',
        data: parameter
    })
}
// 测试接口
export function test() {
    return Request.axiosInstance({
        url: '/index/test',
        method: 'get'
    })
}
// 获取基础信息
export function getBaseInfo() {
    return Request.axiosInstance({
        url: "/index/getBaseInfo",
        method: "get"
    })
}
// 获取所有标签
export function getAllTag() {
    return Request.axiosInstance({
        url: "/index/getAllCategory",
        method:"get"
    })
}
//点赞
export function submitLike(data:any) {
    return Request.axiosInstance({
        url: "/index/submitLikeBiuBiuBiu",
        method: "POST",
        data:data
    })
}