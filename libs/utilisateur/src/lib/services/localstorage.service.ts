import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() { }

  setToken(data:any){
    localStorage.setItem('token', data)
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  removeToken() {
    localStorage.removeItem('token');
  }


}
