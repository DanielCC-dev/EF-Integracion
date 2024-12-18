import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Importamos Observable
import { Platos } from '../models/platos';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private apiUrlGet = 'http://localhost:2500/api/platos';
  private apiUrl = 'http://localhost:2500/api/plato';
 

  constructor(private http: HttpClient) { }

  getPlatos(): Observable<Platos[]> {
    return this.http.get<Platos[]>(this.apiUrlGet);
  }

  addPlato(plato: Platos):  Observable<any> {
    return this.http.post<Platos>(this.apiUrl, plato);
  }

  updatePlato(id: string, plato: FormData): Observable<Platos> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, plato);
  }

  deletePlato(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPlato(id: string): Observable<Platos> {
    return this.http.get<Platos>(`${this.apiUrl}/${id}`);
  }
}
