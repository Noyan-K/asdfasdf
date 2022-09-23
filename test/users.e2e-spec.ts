import { Test } from '@nestjs/testing';
import { AppModule } from '../dist/app.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('UsersController', () => {
  let app: INestApplication;
  let newUserId: number;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/users (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        fullname: 'User23 Userson23',
        email: 'user23@gmail.com',
        password: '1234',
      })
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body).toStrictEqual({
          fullname: 'User23 Userson23',
          email: 'user23@gmail.com',
          password: '1234',
          id: expect.any(Number),
          isActivated: false,
        });

        newUserId = body.id;
      });
  });

  it('/users (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/users/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/users/${newUserId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/users/:id (UPDATE) - success', async () => {
    return request(app.getHttpServer())
      .patch(`/users/${newUserId}`)
      .send({
        fullname: 'User21 Userson21',
        email: 'user21@gmail.com',
        password: '1234',
      })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/users/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete(`/users/${newUserId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });
});
