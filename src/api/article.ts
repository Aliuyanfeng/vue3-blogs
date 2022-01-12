import { Request } from '@/utils/request';

// 获取文章详情
export function getArticleDetail(data:object) {
    return Request.axiosInstance({
        url: "/index/getArticleDetail",
        method: "post",
        data:data
    })
}