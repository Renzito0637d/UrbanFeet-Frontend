import { Injectable } from '@angular/core';
import { Reclamo } from '../models/reclamo.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  private storageKey = 'reclamos';

  constructor() {}

  getReclamos(): Reclamo[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  agregarReclamo(reclamo: Reclamo): void {
    const lista = this.getReclamos();
    lista.push(reclamo);
    localStorage.setItem(this.storageKey, JSON.stringify(lista));
  }

  eliminar(id: number): void {
    const lista = this.getReclamos().filter(r => r.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(lista));
  }
}
