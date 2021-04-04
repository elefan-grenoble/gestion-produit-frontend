import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TagPrintRequest} from '../models/tag-print-request';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {
  }

  getTagPrintRequests(): Observable<TagPrintRequest[]> {
    return this.http.get<TagPrintRequest[]>('/api/tag_print_requests');
  }

  addTagPrintRequest(articleCode: number, quantity: number, reason: string): Observable<TagPrintRequest> {
    return this.http.post<TagPrintRequest>('/api/tag_print_requests', {
      article: articleCode,
      quantity: quantity,
      reason: reason
    });
  }

  deleteTagPrintRequest(id: number): Observable<void> {
    return this.http.delete<void>('/api/tag_print_requests/' + id);
  }

}
