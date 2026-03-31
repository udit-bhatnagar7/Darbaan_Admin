import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';

const users = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['admin', 'user']),
  status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
  createdAt: faker.date.past().toISOString(),
}));

export const handlers = [
  // Auth
  http.post('/api/auth/login', async () => {
    await delay(500);
    return HttpResponse.json({
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      },
      accessToken: 'mock-jwt-token',
    });
  }),

  // Dashboard Stats
  http.get('/api/dashboard/stats', async () => {
    await delay(300);
    return HttpResponse.json({
      totalRevenue: faker.finance.amount({ min: 10000, max: 50000, dec: 2, symbol: '$' }),
      activeUsers: faker.number.int({ min: 1000, max: 5000 }),
      newSubscriptions: faker.number.int({ min: 10, max: 100 }),
      churnRate: faker.number.float({ min: 0.1, max: 5.0, fractionDigits: 1 }) + '%',
    });
  }),

  // Users List
  http.get('/api/users', async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const perPage = Number(url.searchParams.get('perPage') || '10');
    const search = url.searchParams.get('search')?.toLowerCase() || '';

    let filteredUsers = users;
    if (search) {
      filteredUsers = users.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
      );
    }

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedUsers = filteredUsers.slice(start, end);

    await delay(400);
    return HttpResponse.json({
      data: paginatedUsers,
      meta: {
        page,
        perPage,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / perPage),
      },
    });
  }),
];
