import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zapatilla, ZapatillaRequest } from '../models/zapatilla.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ZapatillaService {
  private http = inject(HttpClient);

  private baseUrl = '/zapatilla';

  getPaginated(page: number, size: number): Observable<Page<Zapatilla>> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Zapatilla>>(`${this.baseUrl}/public/list`, { params });
  }
  getPaginatedPublic(page: number = 0, size: number = 12): Observable<Page<Zapatilla>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortDir', 'desc'); // Opcional: Para que salgan los últimos agregados primero

    // CAMBIO: Apuntamos al endpoint público filtrado
    return this.http.get<Page<Zapatilla>>(`${this.baseUrl}/public/list`, { params });
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