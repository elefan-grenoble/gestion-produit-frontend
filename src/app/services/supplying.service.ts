import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

}
