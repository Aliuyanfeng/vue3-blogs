import { Request } from '@/utils/request';

export function getArticleDetail(data:object) {
    return Request.axiosInstance({
        url: "/index/getArticleDetail",
        method: "post",
        data:data
    })
}