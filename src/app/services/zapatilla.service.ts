import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zapatilla, ZapatillaRequest } from '../models/zapatilla.model';

@Injectable({
  providedIn: 'root'
})
export class ZapatillaService {
  private http = inject(HttpClient);

  private baseUrl = '/zapatilla';

  getAll(): Observable<Zapatilla[]> {
    return this.http.get<Zapatilla[]>(this.baseUrl);
  }

  getById(id: number): Observable<Zapatilla> {
    return this.http.get<Zapatilla>(`${this.baseUrl}/${id}`);
  }

  create(data: ZapatillaRequest): Observable<Zapatilla> {
    return this.http.post<Zapatilla>(this.baseUrl, data);
  }

  update(id: number, data: ZapatillaRequest): Observable<Zapatilla> {
    return this.http.put<Zapatilla>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}