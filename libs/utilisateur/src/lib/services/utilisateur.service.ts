import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http : HttpClient) { }

  getUtilisateur(): Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>('http://localhost:3000/app/v1/utilisateur/')
  }

  getUtilisateurById(utilisateurId: string): Observable<Utilisateur>{
    return this.http.get<Utilisateur>('http://localhost:3000/app/v1/utilisateur/'+ utilisateurId)
  }

  crateUtilisateur(utilisateur:Utilisateur){
    return this.http.post('http://localhost:3000/app/v1/utilisateur/', utilisateur);
  }

  modifierUtilisateur(utilisateur:Utilisateur){
    return this.http.put('http://localhost:3000/app/v1/utilisateur/'+utilisateur.id, utilisateur);
  }

  deleteUtilisateur(utilisateurId: string): Observable<object> {
    return this.http.delete<object>(`http://localhost:3000/app/v1/utilisateur/${utilisateurId}`)
  }

  
}
