import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { selectIsLoggedIn } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { login, logout } from '../../Ngrx/Action/Login-Action/loginAction';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn$!: Observable<boolean>;
  constructor(private fb: FormBuilder,private store: Store<AppState>, private router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.router.navigate(['/employees']);
      this.store.dispatch(login({ isLoggedIn: true, email,token: 'dummy'}));
    }
  }

  // Trigger logout action
  onLogout(): void {
    this.store.dispatch(logout());
  }

}
