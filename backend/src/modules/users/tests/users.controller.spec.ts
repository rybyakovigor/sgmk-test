// Core
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

// Controller
import { UsersController } from '../users.controller';

// Service
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let app: INestApplication;
  const userId = 'ba31b04e-2668-4912-9587-9123409da0c5';

  const mockUsersService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    uploadAvatar: jest.fn(),
    deleteAvatar: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/users (GET)`, () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it(`/users - find one (GET)`, () => {
    return request(app.getHttpServer()).get(`/users/${userId}`).expect(200);
  });

  it(`/users (DELETE)`, () => {
    return request(app.getHttpServer()).delete(`/users/${userId}`).expect(204);
  });

  it(`/users (PUT)`, () => {
    return request(app.getHttpServer()).put(`/users/${userId}`).expect(200);
  });

  it(`/users (POST)`, () => {
    return request(app.getHttpServer()).post('/users').expect(201);
  });

  it(`/users avatar (POST)`, () => {
    return request(app.getHttpServer()).post(`/users/${userId}/avatar`).expect(200);
  });

  it(`/users avatar (DELETE)`, () => {
    return request(app.getHttpServer()).delete(`/users/${userId}/avatar`).expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
