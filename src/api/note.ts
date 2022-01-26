import { Request } from '@/utils/request';

// 获取文章详情
export function getAllNoteCategory() {
    return Request.axiosInstance({
        url: "/index/getNoteCategory",
        method: "get",
    })
}