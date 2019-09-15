import {Article} from "./article";

export interface TagPrintRequest {
  id: number;
  article: Article;
  quantity: number;
  reason: string;
  date: Date;
}
