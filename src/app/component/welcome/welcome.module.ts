import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'; // <-- Added for Sidenav
import { MatCardModule } from '@angular/material/card'; // <-- Added for Features/Testimonials
import { WelcomeComponent } from './welcome.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Welcome | ExpenseTracker'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'signup'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
  }
];

@NgModule({
  declarations: [WelcomeComponent, SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule, // 
    MatCardModule, // 
    RouterModule.forChild(routes)
  ]
})
export class WelcomeModule { }