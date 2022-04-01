import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Document } from '../models/documnt';

@Injectable({
  providedIn: 'root'
})
export class DocumntService {

  constructor(private http : HttpClient) { }

  getDocument(): Observable<Document[]>{
    return this.http.get<Document[]>('http://localhost:3000/app/v1/document/')
  }

  getDocumentById(documentId: string): Observable<Document>{
    return this.http.get<Document>('http://localhost:3000/app/v1/document/'+ documentId)
  }

  
}
