import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-order-table',
  standalone: false,
  template: `
    <div style="padding: 20px; border: 1px dashed #ccc">
      <h3>Компонент 1: Список заказов</h3>
      <p>Тут будет таблица или список всех заказов...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTableComponent {}
