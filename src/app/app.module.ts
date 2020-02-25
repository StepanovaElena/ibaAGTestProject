import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { UserPageComponent } from './user-page/user-page.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {AuthInterceptor} from './shared/auth.interceptor';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserPageComponent,
    FilterPipe,
    UserCreateComponent,
    UserUpdateComponent,
    CheckboxComponent,
    AlertComponent,
    ErrorPageComponent,
    GroupCreateComponent,
    GroupUpdateComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {

}
