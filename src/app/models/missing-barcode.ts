import {Article} from "./article";

export interface MissingBarcode {
  id: number;
  article: Article;
  barcode: number;
  date: Date;
}
