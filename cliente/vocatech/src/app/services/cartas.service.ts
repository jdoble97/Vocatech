import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http: HttpClient) { }

  getCartas(idBaraja: number, token: string){
    let miUrl = `http://localhost:7777/api/barajas/${idBaraja}`;
    return this.http.get(miUrl, {headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }});
  }
}
