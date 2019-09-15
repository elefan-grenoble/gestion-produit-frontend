import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MissingBarcode} from "../models/missing-barcode";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BarcodesService {

  constructor(private http: HttpClient) {
  }

  getMissingBarcodes(): Observable<MissingBarcode[]> {
    return this.http.get<MissingBarcode[]>('/api/missing_barcodes');
  }

  addMissingBarcode(articleCode: number, barcode: number): Observable<MissingBarcode> {
    return this.http.post<MissingBarcode>('/api/missing_barcodes', {
      article: articleCode,
      barcode: +barcode
    });
  }

  deleteMissingBarcode(id: number): Observable<void> {
    return this.http.delete<void>('/api/missing_barcodes/' + id);
  }

}
