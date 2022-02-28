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