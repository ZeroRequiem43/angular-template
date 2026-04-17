import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-order-details',
  standalone: false,
  template: `
    <div style="padding: 20px; border: 1px dashed #3f51b5">
      <h3>Компонент 2: Детали заказа</h3>
      <p>Информация о конкретном заказе (ID: 12345)</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent {}
