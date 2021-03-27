import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supplying} from "../models/supplying";

@Injectable({
  providedIn: 'root'
})
export class SupplyingService {

  constructor(private http: HttpClient) {
  }

  getSupplyingList(): Observable<Supplying[]> {
    return this.http.get<Supplying[]>('/api/supplying');
  }

  addToSupplyingList(articleCode: number, quantity: number): Observable<Supplying> {
    const options = {
      params: new HttpParams().set('articleCode', articleCode.toString()).set('quantity', quantity.toString())
    };
    return this.http.post<Supplying>('/api/supplying', {}, options);
  }

  updateSupplying(supplying: Supplying): Observable<void> {
    return this.http.put<void>('/api/supplying/' + supplying.id, supplying);
  }

  deleteSupplying(supplying: Supplying, out_of_stock: boolean): Observable<void> {
    const options = {
      params: new HttpParams().set('out_of_stock', out_of_stock.toString())
    };
    return this.http.delete<void>('/api/supplying/' + supplying.id, options);
  }

}
