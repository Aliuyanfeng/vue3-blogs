export interface articleInfoInterface {
    id?: number;
    article_title?: string;
    article_description?: string;
    article_like?: string;
    article_read?: string;
    article_createtime?: string;
    article_cover?: string;
    article_tag?: Array<string> | string;
    article_status?: string;
    article_content?: string;
    article_comment?: string;
    article_author?: string;
    article_importance?: string | number;
}

// 文章item类型
export type articleItem = {
  id: number;
  article_title: string;
  article_description: string;
  article_createtime: string;
  article_like: number;
  article_read: number;
  article_tag: string;
  article_cover: string;
};

// 声明接口返回数据类型
export type Data = {
  data:articleItem[];
  total: number;
};

