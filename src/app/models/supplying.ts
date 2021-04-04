import {Article} from './article';

export interface Supplying {
  id: number;
  article: Article;
  quantity: number;
  creation_date?: string;
  supply_date?: string;
  out_of_stock?: boolean;
}
