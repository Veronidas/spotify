import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent  implements OnInit{
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({});

  constructor(private _authService: AuthService, private cookie: CookieService){}
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    })
  }

  sendLogin():void{
    const { email, password} = this.formLogin.value;
    this._authService.sendCredentials(email, password)
    .subscribe(responseOk => {
      console.log('Sesion iniciada correctamente');
      // const { tokenSession, data } = responseOk;
      // this.cookie.set('token', tokenSession, 4, '/');
    },
    err => {
      this.errorSession = true
      console.log('Ocurrio un error con tu email o password');
    })
  }
}
