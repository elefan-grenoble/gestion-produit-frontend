import {Famille} from './famille';
import {Fournisseur} from './fournisseur';

export interface Article {
  code: number;
  designation: string;
  code_tva: number;
  qte_appro: number;
  prix_vente: number;
  anc_prix_vente: number;
  prix_promo: number;
  prix_achat_brut: number;
  anc_prix_achat_brut: number;
  remise_achat: number;
  status: string;
  qte_kg_litre: number;
  unite_vente: string;
  date_creation: Date;
  date_modification: Date;
  taux_tva: number;
  prix_vente_ht: number;
  anc_prix_vente_ht: number;
  famille: Famille;
  fournisseur: Fournisseur;
}
