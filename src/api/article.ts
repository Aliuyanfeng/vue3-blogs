import { Request } from '@/utils/request';

export function getArticleDetail(data:object) {
    return Request.axiosInstance({
        url: "/admin/getArticleDetail",
        method: "post",
        data:data
    })
}