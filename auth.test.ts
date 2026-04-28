import request from 'supertest';
import app from '../index';

describe('Auth endpoints', () => {
  const testUser = { email: 'testuser@example.com', password: 'password123' };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(testUser.email);
  });

  it('should not register the same email twice', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);
    expect(res.status).toBe(409);
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(testUser);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});