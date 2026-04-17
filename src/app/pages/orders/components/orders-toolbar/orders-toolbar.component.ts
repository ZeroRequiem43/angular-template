import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-orders-toolbar',
  standalone: false,
  templateUrl: './orders-toolbar.component.html',
  styleUrl: './orders-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersToolbarComponent {
  readonly showOnlyNew = input(false);
  readonly toggleOnlyNew = output<void>();
}

