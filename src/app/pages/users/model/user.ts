import { UserDto } from '@core/api/client/models/user-dto';

export class User {
  public readonly id: number;
  public readonly name: string;
  public readonly role: 'admin' | 'manager' | 'user';

  constructor(dto: UserDto) {
    this.id = dto.user_internal_id;
    this.name = `${dto.first_name} ${dto.last_name}`.trim();
    this.role = dto.access_role as 'admin' | 'manager' | 'user';
  }
}
