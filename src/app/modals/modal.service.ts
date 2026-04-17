import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmModalData } from '@modals/confirm-dialog/model/confirm-dialog.types';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly dialog = inject(MatDialog);

  private async openLazy<TComponent, TResult, TData>(
    loader: () => Promise<Type<TComponent>>,
    config?: MatDialogConfig<TData>,
  ): Promise<TResult | undefined> {
    const Component = await loader();
    const ref = this.dialog.open(Component, config);
    return firstValueFrom(ref.afterClosed());
  }

  public openConfirmModal = (data: ConfirmModalData): Promise<boolean | undefined> => {
    return this.openLazy<any, boolean, ConfirmModalData>(
      () => import('@modals/confirm-dialog/confirm-dialog.modal').then((m) => m.ConfirmDialogModal),
      {
        width: '400px',
        disableClose: true,
        data,
      },
    );
  };
}
