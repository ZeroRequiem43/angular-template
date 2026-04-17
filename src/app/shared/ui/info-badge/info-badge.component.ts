import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-info-badge',
  imports: [MatBadgeModule],
  templateUrl: './info-badge.component.html',
  styleUrl: './info-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBadgeComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
}

