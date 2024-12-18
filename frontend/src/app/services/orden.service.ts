import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Orden } from '../models/orden';
import { Mesa, MESAS } from '../models/mesas';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = 'http://localhost:2500/api/orden';

  constructor(private http: HttpClient) { }

  addOrden(orden: Orden): Observable<any> {
    return this.http.post<Orden>(this.apiUrl, orden);
  }

  updateOrden(id: string, orden: Orden): Observable<Orden> {
    return this.http.put<Orden>(`${this.apiUrl}/${id}`, orden);
  }

  deleteOrden(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getOrden(id: string): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrl}/${id}`);
  }

  getOrdenes(): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrl}`);
  }

  getMesas(): Observable<Mesa[]> {
    return of(MESAS);
  }
}
