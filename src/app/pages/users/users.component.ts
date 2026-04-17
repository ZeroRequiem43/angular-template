import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { OrdersService, UsersService } from '@core/api/client/services';
import { ModalService } from '@modals/modal.service';
import { UsersStore } from '../../store/users.store';


@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly destroy$ = inject(DestroyRef);

  public readonly store = inject(UsersStore);
  private readonly modalService = inject(ModalService);

  private readonly usersService = inject(UsersService);
  private readonly ordersService = inject(OrdersService);

  public search = signal('');

  public filteredUsers = computed(() => {
    const normalizedSearch = this.search().trim().toLowerCase();
    const users = this.store.users();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((item) => item.name.toLowerCase().includes(normalizedSearch));
  });

  public onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
  }

  public callApiWithError(): void {
    this.store.updateParams({ fail: true });
    this.store.reload();
  }

  public callApiWithAuthError(): void {
    // Для тестирования keycloak refresh token
    const req1$ = this.ordersService.getOrders({authFail: true});
    const req2$ = this.usersService.getUsers({authFail: true});

    forkJoin([req1$, req2$]).pipe(
      takeUntilDestroyed(this.destroy$),
    ).subscribe({
      next: () => console.log('1'),
    })
  }

  public resetError(): void {
    this.store.updateParams({ fail: undefined });
    this.store.reload();
  }

  public async openModal() {
    const isConfirmed = await this.modalService.openConfirmModal({
      title: 'Действие',
      message: 'Вы уверены? Это действие необратимо.',
      confirmText: 'Уверен',
    });

    if (!isConfirmed) return;

    console.log('Кнопка нажата');
  }
}
