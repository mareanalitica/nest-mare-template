import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/create (POST)', () => {
    const userData = {
      email: 'teste@teste.com',
      password: 'paulo123',
      name: 'teste',
    };

    return request(app.getHttpServer())
      .post('/user/create')
      .send(userData)
      .expect(201) // 201 Created é um status apropriado para uma criação bem-sucedida
      .expect((res) => {
        // Verifique a resposta para garantir que o usuário foi criado com sucesso
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        // Adicione mais verificações conforme necessário
      });
  });

  it('/user/:id (GET)', () => {
    // Suponhamos que você tenha um ID válido de usuário existente
    const userId = '652cb285d41e90b406380c16';

    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200)
      .expect((res) => {
        // Verifique a resposta para garantir que os detalhes do usuário são retornados
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('name');
        // Adicione mais verificações conforme necessário
      });
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect((res) => {
        // Verifique a resposta para garantir que uma lista de usuários é retornada
        expect(Array.isArray(res.body)).toBe(true);
        // Verifique o formato dos objetos de usuário na lista
        if (res.body.length > 0) {
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
          // Adicione mais verificações conforme necessário
        }
      });
  });
});
