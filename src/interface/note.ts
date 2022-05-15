import {
    VNodeChild
} from "vue";

export interface InoteCategory {
    id?: number,
    classify_name?: string,
    children?: InoteCategory[],
}
export interface MenuInfo {
    key: string;
    keyPath: string[];
    item: VNodeChild;
    domEvent: MouseEvent;
}
export interface InoteItem {
    id?: number,
    create_time?: string,
    note_classify_id?: string,
    note_html?: string,
    note_md?: string,
    note_name?: string,
}