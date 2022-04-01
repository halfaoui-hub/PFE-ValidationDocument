import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'utilisateur-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private auth:AuthService,
    private localstorageService: LocalstorageService,
    private router : Router) { }

  registerForm:any= FormGroup;
  submitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
  }

  this.auth.login(this.f.email.value, this.f.password.value).subscribe(
    (utilisateur) =>{
      
    this.authError = false;
    this.localstorageService.setToken(utilisateur.token)
    this.router.navigate(['']);
  },
  (error: HttpErrorResponse) => {
   
    this.authError=true;
    if (error.status !== 400) {
      this.authMessage = 'Error in the server, please try again later!'
    }
  })
  // if(this.submitted)
  // {
  //   alert("Great!!");
  // }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      });
  }

}
