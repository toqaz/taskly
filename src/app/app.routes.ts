import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ProjectComponent } from './features/project/pages/project/project/project.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
    ],
  },
  {
    path:'',
    component:MainLayoutComponent,
    children:[
{
    path: 'project',
    component: ProjectComponent,
    title: 'Project',
  }
    ]
  },
  {
    path: '**',
    redirectTo: 'register',
  },
];
