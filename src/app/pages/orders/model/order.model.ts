export interface OrderModel {
  id: number;
  client: string;
  total: number;
  status: 'new' | 'done';
}

