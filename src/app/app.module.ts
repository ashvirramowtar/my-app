import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { authInterceptorProviders } from './interceptors/auth.interceptor';

import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    LoaderComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    authInterceptorProviders,
    AuthGuard,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
