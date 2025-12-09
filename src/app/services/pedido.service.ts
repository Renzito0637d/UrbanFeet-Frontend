import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoRequest, PedidoResponse } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);
  private baseUrl = '/pedidos';

  crearPedido(request: PedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.baseUrl, request);
  }

  listarMisPedidos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(this.baseUrl);
  }

  cancelarPedido(id: number): Observable<void> {
    // PATCH suele requerir un cuerpo, aunque sea vacío
    return this.http.patch<void>(`${this.baseUrl}/${id}/cancelar`, {});
  }
}