import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {

  private apiUrl = '/sugerencias';

  constructor(private http: HttpClient) {}

  crearSugerencia(data: { asunto: string; mensaje: string }) {
  return this.http.post('/sugerencias', data);
}

}
