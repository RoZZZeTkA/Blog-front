import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './activation/activation.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearhResultsComponent } from './searh-results/searh-results.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'user/:id', component:UserComponent},
  {path: 'post/:id', component:PostComponent},
  {path: 'post-add', component:AddPostComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'admin/user/:id', component:AdminUserComponent},
  {path: '', component:HomeComponent},
  {path: 'search', component:SearhResultsComponent},
  {path: 'activation/:activationCode', component:ActivationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
