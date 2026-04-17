import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '@pages/users/model/user';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly users = input<User[]>([]);
}

