import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supply} from "../models/supply";

@Injectable({
  providedIn: 'root'
})
export class SupplyingService {

  constructor(private http: HttpClient) {
  }

  getSupplyingList(): Observable<Supply[]> {
    return this.http.get<Supply[]>('/api/supplying');
  }

  addToSupplyingList(articleCode: number, quantity: number): Observable<void> {
    return this.http.post<void>('/api/supplying/' + articleCode + '/quantity/' + quantity, {})
  }

}
