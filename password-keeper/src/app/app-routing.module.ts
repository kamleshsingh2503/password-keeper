import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { DisplayLoginsComponent } from './display-logins/display-logins.component';
import { WebsiteLoginsComponent } from './website-logins/website-logins.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: 'app/user', component: CreateUserComponent },
    { path: 'app/user/auth', component: LoginComponent },
    { path : 'app/sites/list', component : DisplayLoginsComponent},
    { path : 'app/sites', component : WebsiteLoginsComponent},
    { path : 'home', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
