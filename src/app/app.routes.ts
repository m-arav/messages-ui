import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { authGuard } from './auth.guard';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: '**', redirectTo: 'home' }
];
