import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from '@pages/orders/components/order-details/order-details.component';
import { OrderTableComponent } from '@pages/orders/components/order-table/order-table.component';
import { OrdersComponent } from './orders.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: 'table',
        component: OrderTableComponent,
      },
      {
        path: 'details',
        component: OrderDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
