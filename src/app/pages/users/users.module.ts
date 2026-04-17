import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfoBadgeComponent } from '@shared/ui/info-badge/info-badge.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersComponent, UserListComponent],
  imports: [CommonModule, FormsModule, UsersRoutingModule, InfoBadgeComponent],
})
export class UsersModule {}

