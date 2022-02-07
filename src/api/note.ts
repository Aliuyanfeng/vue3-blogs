import { Request } from '@/utils/request';

// 获取文章详情
export function getAllNoteCategory() {
    return Request.axiosInstance({
        url: "/index/getNoteCategory",
        method: "get",
    })
}

// 获取分类下的所有笔记
export function getClassifyNote(data:any) {
    return Request.axiosInstance({
        url: "/index/getNote",
        method: "post",
        data
    })
}