import { delay, http, HttpResponse } from 'msw';
import { UserDto } from '@core/api/client/models';
import { OrderModel } from '@pages/orders/model/order.model';


let usersFailed = false;
let ordersFailed = false;

export const handlers = [
  http.get('http://localhost:3000/users', async ({ request }) => {
    const url = new URL(request.url);
    const nameFilter = url.searchParams.get('name')?.toLowerCase();

    // Имитируем базу данных
    const users: UserDto[] = [
      {
        user_internal_id: 1,
        first_name: 'Alex',
        last_name: 'Ivanov',
        access_role: 'admin',
        is_active: true,
        last_login: new Date().toISOString(),
      },
      {
        user_internal_id: 2,
        first_name: 'Maria',
        last_name: 'Petrova',
        access_role: 'manager',
        is_active: true,
        last_login: new Date().toISOString(),
      },
      {
        user_internal_id: 3,
        first_name: 'Ivan',
        last_name: 'Komarov',
        access_role: 'admin',
        is_active: true,
        last_login: new Date().toISOString(),
      },
      {
        user_internal_id: 4,
        first_name: 'Nikita',
        last_name: 'Makov',
        access_role: 'admin',
        is_active: true,
        last_login: new Date().toISOString(),
      },
    ];

    await delay(800); // Имитация задержки сети

    const shouldFail = url.searchParams.get('fail') === 'true';

    if (shouldFail) {
      // Возвращаем 500 ошибку с пояснением в теле (опционально)
      return new HttpResponse(
        JSON.stringify({ message: 'Internal Server Error: Database is down' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const shouldAuthFail = url.searchParams.get('authFail') === 'true';

    if (shouldAuthFail && !usersFailed) {
      usersFailed = true;
      return new HttpResponse(JSON.stringify({ message: 'No auth' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let filtered = users;
    if (nameFilter) {
      filtered = users.filter((u) =>
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(nameFilter),
      );
    }

    return HttpResponse.json({
      meta: { timestamp: new Date().toISOString(), total_records: filtered.length, page: 0 },
      data: filtered,
    });
  }),

  http.get('http://localhost:3000/orders', async ({ request }) => {
    const url = new URL(request.url);

    await delay(800); // Имитация задержки сети

    const shouldAuthFail = url.searchParams.get('authFail') === 'true';

    const orders: OrderModel[] = [
      {id: 666, status: 'new', client: 'TEst', total: 10}
    ];


    if (shouldAuthFail && !ordersFailed) {
      ordersFailed = true;
      return new HttpResponse(JSON.stringify({ message: 'No auth' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return HttpResponse.json({
      data: orders,
    });
  }),
];
