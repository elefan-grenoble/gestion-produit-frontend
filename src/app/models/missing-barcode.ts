import {Article} from "./article";

export interface MissingBarcode {
  article: Article;
  barcode: number;
  date: Date;
}
