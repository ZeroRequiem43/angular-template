import { Component, inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmModalData } from '@modals/confirm-dialog/model/confirm-dialog.types';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>

    <mat-dialog-content>
      {{ data.message }}
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">
        {{ data.cancelText || 'Отмена' }}
      </button>

      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        {{ data.confirmText || 'Ок' }}
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogModal {
  // Инжектим данные и строго типизируем их
  public readonly data = inject<ConfirmModalData>(MAT_DIALOG_DATA);
}
