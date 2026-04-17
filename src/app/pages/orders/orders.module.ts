import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel, MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from '@pages/orders/components/order-details/order-details.component';
import { OrderTableComponent } from '@pages/orders/components/order-table/order-table.component';
import { InfoBadgeComponent } from '@shared/ui/info-badge/info-badge.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrdersStatsComponent } from './components/orders-stats/orders-stats.component';
import { OrdersToolbarComponent } from './components/orders-toolbar/orders-toolbar.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersToolbarComponent,
    OrdersStatsComponent,
    OrderListComponent,
    OrderTableComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrdersRoutingModule,
    InfoBadgeComponent,
    MatTabsModule,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
  ],
})
export class OrdersModule {}
