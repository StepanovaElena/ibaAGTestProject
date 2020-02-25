import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {UserPageComponent} from './user-page/user-page.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {GroupCreateComponent} from './group-create/group-create.component';
import {GroupUpdateComponent} from './group-update/group-update.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthService} from './shared/servises/auth.service';
import {GroupResolver} from './shared/resolvers/group.resolver';
import {PermissionResolver} from './shared/resolvers/permission.resolver';
import {UserResolver} from './shared/resolvers/user.resolver';


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/user/create', pathMatch: 'full'},
      {path: 'user', redirectTo: '/user/create', pathMatch: 'full'},
      {path: 'group', redirectTo: '/group/create', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {
        path: '', component: UserPageComponent, children: [
          {path: 'user/create', component: UserCreateComponent, canActivate: [AuthService]},
          {
            path: 'user/update/:id', component: UserUpdateComponent, canActivate: [AuthService], resolve: {
              groups: GroupResolver,
              permissions: PermissionResolver
            }
          },
          {path: 'group/create', component: GroupCreateComponent, canActivate: [AuthService], resolve: {
              users: UserResolver,
              permissions: PermissionResolver
            }},
          {
            path: 'group/update/:id', component: GroupUpdateComponent, canActivate: [AuthService], resolve: {
              users: UserResolver,
              permissions: PermissionResolver
            }
          }
        ]
      },
      {path: 'error', component: ErrorPageComponent},
      {path: '**', redirectTo: '/error'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
