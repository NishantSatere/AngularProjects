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

import { selectedPage } from '../../Ngrx/Action/SiderBar-Action/SelectedPageAction';
import { SidePageStateGlobal } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { selectSelectedPage } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';

import { removeSideState } from '../../Ngrx/Action/SiderBar-Action/SideAction';
import { NavState } from '../../Ngrx/Selector/Side-Selector/SideSelector';
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
  isSidePageSelected$!: Observable<string>;
  isSidePageSelected!: string;
  constructor(private fb: FormBuilder,private store: Store<AppState>,private store1: Store<SidePageStateGlobal>, private store2: Store<NavState>, private router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isSidePageSelected$ = this.store1.select(selectSelectedPage);
    this.store1.dispatch(selectedPage({page:"login"}))
    this.isSidePageSelected$.subscribe((data) => {
      this.isSidePageSelected = data;
    })
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
      this.store1.dispatch(selectedPage({ page: "employees" }));
      // this.store2.dispatch(removeSideState());
    }
  }

  // Trigger logout action
  onLogout(): void {
    this.store.dispatch(logout());
  }

}
