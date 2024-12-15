import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Login } from '../../models/login';
import { MeseroService } from '../../services/mesero.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    imports: [NgIf, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private datalogin: MeseroService, private cookieService: CookieService){
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
    })
  }

  loginUser(){
    const USER: Login = {
      correo: this.loginForm.get('correo')?.value,
      contraseña: this.loginForm.get('contraseña')?.value,
    }

    this.datalogin.login(USER).subscribe({
      next: (response) => {
        const token = response.token;

        // Guarda el token en una cookie
        this.cookieService.set('jwt_token', token, {
          path: '/',        
          secure: true,     
          sameSite: 'Strict' 
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Si la solicitud falla, mostramos un mensaje de error
        this.errorMessage = 'Credenciales inválidas. Intente de nuevo.';
      }
    });
  }
}
