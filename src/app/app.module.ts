import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { HomeComponent } from './home/home.component';
import { SearhResultsComponent } from './searh-results/searh-results.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ActivationComponent } from './activation/activation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    PostComponent,
    RegistrationComponent,
    AddPostComponent,
    AdminComponent,
    AdminUserComponent,
    HomeComponent,
    SearhResultsComponent,
    PaginationComponent,
    ActivationComponent,
    ResetPasswordComponent,
    ResetEmailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
