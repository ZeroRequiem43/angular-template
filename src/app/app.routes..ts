import { Routes } from '@angular/router';
import { WrapperComponent } from '@pages/wrapper/wrapper.component';
import { authGuard } from '@auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'orders',
        loadChildren: () =>
          import('@pages/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
