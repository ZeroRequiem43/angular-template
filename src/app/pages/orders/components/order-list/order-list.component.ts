import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OrderModel } from '../../model/order.model';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  readonly orders = input<OrderModel[]>([]);
}

