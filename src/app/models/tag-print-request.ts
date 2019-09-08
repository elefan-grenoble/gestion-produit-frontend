import {Article} from "./article";

export interface TagPrintRequest {
  article: Article;
  quantity: number;
  reason: string;
  date: Date;
}
