import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderModel } from './model/order.model';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  protected readonly orders: OrderModel[] = [
    { id: 1001, client: 'Acme Corp', total: 1250, status: 'new' },
    { id: 1002, client: 'Delta LLC', total: 500, status: 'done' },
    { id: 1003, client: 'Sunrise Ltd', total: 780, status: 'new' },
    { id: 1004, client: 'Bright Tech', total: 2100, status: 'done' },
  ];

  protected showOnlyNew = false;

  protected toggleOnlyNew(): void {
    this.showOnlyNew = !this.showOnlyNew;
  }

  protected get visibleOrders(): OrderModel[] {
    return this.showOnlyNew ? this.orders.filter((item) => item.status === 'new') : this.orders;
  }
}

