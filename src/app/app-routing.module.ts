import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'user/:id', component:UserComponent},
  {path: 'post/:id', component:PostComponent},
  {path: 'post-add', component:AddPostComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'admin/user/:id', component:AdminUserComponent},
  {path: '', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
