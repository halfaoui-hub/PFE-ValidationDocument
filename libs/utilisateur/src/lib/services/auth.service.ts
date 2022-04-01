import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
    private localstorageToken: LocalstorageService,
    private router: Router) { }

  login(email:string, password:string):Observable<Utilisateur>{
    return this.http.post<Utilisateur>('http://localhost:3000/app/v1/utilisateur/login', {email,password})
  }

  logout() {
   this.localstorageToken.removeToken()
   this.router.navigate(['/login'])

  }
}
