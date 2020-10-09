import request from 'supertest';
import supertest from 'supertest';
import mongoose, {Connection} from 'mongoose';

import {app} from '../app';
import {keys} from '../keys/keys';
import {IWashingMachine, WashingMachineModel} from '../models/WashingMachine';

import {describe} from '@jest/globals';
import DoneCallback = jest.DoneCallback;

describe('Tests for endpoints', () => {
  let conn: Connection;
  beforeAll(async (): Promise<void> => {
    conn = mongoose.createConnection(keys.MONGO_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    conn.on('error', (): void => {
      throw new Error(`unable to connect to db: ${keys.MONGO_LOCAL}`);
    });

    await request(app).post('/api/washingMachine').send({
      serialNumber: 388,
      model: 'testing model',
      dateOfManufacture: Date.now().toLocaleString(),
    });
  });

  afterAll(async (): Promise<void> => {
    await WashingMachineModel.deleteMany({}).exec();
    await conn.close();
  });

  test('POST - /api/washingMachine - empty body',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            post('/api/washingMachine');
        const {status, data}: { status: string, data: string } = response.body;
        expect(response.status).toBe(500);
        expect(status).toBe('error');
        expect(data).toContain('validation failed');
        done();
      });

  test('POST - /api/washingMachine - with data',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            post('/api/washingMachine').
            send({
              serialNumber: 936,
              model: 'testing model',
              dateOfManufacture: Date.now().toLocaleString(),
            });
        const {status, data}: { status: string, data: IWashingMachine } = response.body;
        expect(response.status).toBe(201);
        expect(status).toBe('success');
        expect(data).toBeInstanceOf(Object);
        expect(typeof data.model).toBe('string');
        expect(typeof data.serialNumber).toBe('number');
        expect(typeof data.dateOfManufacture).toBe('string');
        expect(typeof data.status).toBe('boolean');
        expect(data.status).toBeTruthy();
        expect(typeof data.washingCycles).toBe('number');
        expect(data.washingCycles).toEqual(0);
        expect(data.historyOfErrors).toBeInstanceOf(Array);
        done();
      });

  test('POST - /api/washingMachine - get error if serial number exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            post('/api/washingMachine').
            send({
              serialNumber: 936,
              model: 'testing model',
              dateOfManufacture: Date.now().toLocaleString(),
            });
        const {status, data}: { status: string, data: string } = response.body;
        expect(response.status).toBe(500);
        expect(status).toBe('error');
        expect(data).toContain('duplicate key');
        done();
      });

  test('GET - /api/washingMachine - get all machines',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            get('/api/washingMachine');
        const {status, data}: { status: string, data: Array<IWashingMachine> } = response.body;
        expect(status).toBe('success');
        expect(data).toBeInstanceOf(Array);
        expect(data.length).toEqual(2);
        expect(data[0].serialNumber).toEqual(388);
        done();
      });

  test(
      'GET - /api/washingMachine/:serialNumber - get machine with serial number 388',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            get('/api/washingMachine/388');
        const {status, data}: { status: string, data: IWashingMachine } = response.body;
        expect(status).toBe('success');
        expect(data).toBeInstanceOf(Object);
        expect(data.serialNumber).toEqual(388);
        done();
      });

  test(
      'GET - /api/washingMachine/:serialNumber - get failed if serial number isn\'t exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            get('/api/washingMachine/0');
        const {status, data}: { status: string, data: string } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(data).toContain('не найдена');
        done();
      });

  test('GET - /api/washingMachine/model - get machines with the same model',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            get('/api/washingMachine/model').
            send({
              model: 'testing model',
            });
        const {status, data}: { status: string, data: Array<IWashingMachine> } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data.length).toBe(2);
        expect(data[1].serialNumber).toEqual(936);
        expect(data[0].model).toEqual(data[1].model);
        done();
      });

  test('GET - /api/washingMachine/model - get failed if model isn\'t exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            get('/api/washingMachine/model').
            send({
              model: 'release machine',
            });
        const {status, data}: { status: string, data: Array<IWashingMachine> } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(data).toContain('не найдены');
        done();
      });

  test('GET - /api/washingMachine/status - get machines with the same status',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            get('/api/washingMachine/status').
            send({
              status: true,
            });
        const {status, data}: { status: string, data: Array<IWashingMachine> } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data.length).toEqual(2);
        expect(data[0].status).toEqual(data[1].status);
        done();
      });

  test(
      'GET - /api/washingMachine/status - get an empty array if status isn\'t exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            get('/api/washingMachine/status').
            send({
              status: false,
            });
        const {status, data}: { status: string, data: [] } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data).toBeInstanceOf(Array);
        expect(data.length).toEqual(0);
        done();
      });

  test(
      'DELETE - /api/washingMachine/:serialNumber - delete one machine by serial number',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/388');
        const {status, data}: { status: string, data: string } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data).toContain('успешно удалена');
        done();
      });

  test(
      'DELETE - /api/washingMachine/:serialNumber - get failed if machine isn\'t exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/0');
        const {status, data}: { status: string, data: string } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(data).toContain('не найдена');
        done();
      });

  test(
      'DELETE - /api/washingMachine/model - delete anything if model isn\'t' +
      ' exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/model').
            send({
              model: 'release model',
            });
        const dbData = await WashingMachineModel.find({}).exec();
        const {status, data}: { status: string, data: string } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(data).toContain('не найдены');
        expect(dbData.length).toEqual(1);
        done();
      });

  test(
      'DELETE - /api/washingMachine/model - delete all machines with the same model',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/model').
            send({
              model: 'testing model',
            });
        const dbData = await WashingMachineModel.find({}).exec();
        const {status, data}: { status: string, data: string } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data).toContain('успешно удалены');
        expect(dbData.length).toEqual(0);
        done();
      });

});
