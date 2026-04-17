import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { OrderModel } from '../../model/order.model';

@Component({
  selector: 'app-orders-stats',
  standalone: false,
  templateUrl: './orders-stats.component.html',
  styleUrl: './orders-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersStatsComponent {
  readonly orders = input<OrderModel[]>([]);

  protected readonly totalSum = computed(() =>
    this.orders().reduce((acc, item) => acc + item.total, 0),
  );
}

