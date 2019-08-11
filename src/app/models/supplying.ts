import {Article} from "./article";

export interface Supplying {
  article: Article;
  qte_appro: number;
  date_creation?: Date;
  date_appro?: Date;
}

