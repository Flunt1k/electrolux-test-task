import request from 'supertest';
import supertest from 'supertest';
import mongoose, {Connection} from 'mongoose';

import {app} from '../app';
import {keys} from '../keys/keys';
import {IWashingMachine, WashingMachineModel} from '../models/WashingMachine';

import DoneCallback = jest.DoneCallback;
import {IErrorList} from '../core/interfaces';

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
        const {status, message}: { status: string, message: string } = response.body;
        expect(response.status).toBe(500);
        expect(status).toBe('error');
        expect(message).toContain('validation failed');
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
        const {status, message}: { status: string, message: string } = response.body;
        expect(response.status).toBe(500);
        expect(status).toBe('error');
        expect(message).toContain('duplicate key');
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
        const {status, data, message}: { status: string, data: undefined, message: string } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(message).toContain('не найдены');
        expect(data).toBeUndefined();
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

  test('PATCH - /api/washingMachine/errorList/:serialNumber - get an updated' +
      ' error list',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            patch('/api/washingMachine/errorList/388').
            send({
              error: {code: 'E204', errorText: 'Поломка'},
            });
        const {status, data}: { status: string, data: { list: IErrorList, serialNumber: number } } = response.body;
        expect(status).toBe('success');
        expect(data.list.listOfErrors.length).toBe(1);
        done();
      });

  test('PATCH - /api/washingMachine/errorList/:serialNumber - get failed if' +
      ' serialNumber isn\'t valid',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            patch('/api/washingMachine/errorList/1230').
            send({
              error: {code: 'E204', errorText: 'Поломка'},
            });
        const {status, data, message}: { status: string, data: undefined, message: string } = response.body;
        expect(status).toBe('failed');
        expect(message).toContain('не найдена');
        expect(data).toBeUndefined();
        done();
      });

  test('PATCH - /api/washingMachine/:serialNumber - get an updated machine',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            patch('/api/washingMachine/388').
            send({
              updates: {
                washingCycles: 900,
              },
            });
        const {status, data}: { status: string, data: IWashingMachine } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data.washingCycles).toEqual(900);
        done();
      });

  test('PATCH - /api/washingMachine/:serialNumber - nothing update if serial' +
      ' number isn\'t exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            patch('/api/washingMachine/00').
            send({
              updates: {
                washingCycles: 1230,
              },
            });
        const {status, data, message}: { status: string, data: undefined, message: string } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(message).toContain('не найдена');
        expect(data).toBeUndefined();
        done();
      });

  test('PATCH - api/washingMachine/status/:serialNumber - update status of' +
      ' one machine',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            patch('/api/washingMachine/status/388');
        const {status, data}: { status: string, data: IWashingMachine } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data.status).toBe(false);
        done();
      });

  test('PATCH - api/washingMachine/status/:serialNumber - update nothing if' +
      ' serial number is wrong',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            patch('/api/washingMachine/status/0');
        const {status, data, message}: { status: string, data: undefined, message: string } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(message).toContain('не найдена');
        expect(data).toBeUndefined();
        done();
      });

  test(
      'DELETE - /api/washingMachine/:serialNumber - delete one machine by serial number',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/388');
        const {status, data, message}: { status: string, data: string, message: undefined } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(data).toBe(388);
        expect(message).toBeUndefined();
        done();
      });

  test(
      'DELETE - /api/washingMachine/:serialNumber - get failed if machine isn\'t exist',
      async (done: DoneCallback): Promise<void> => {
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/0');
        const {status, data, message}: { status: string, data: undefined, message: string } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(message).toContain('не найдена');
        expect(data).toBeUndefined();
        done();
      });

  test(
      'DELETE - /api/washingMachine/model - delete nothing if model isn\'t' +
      ' exist',
      async (done: DoneCallback): Promise<void> => {
        const model: string = 'release model';
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/model').
            send({
              model,
            });
        const dbData = await WashingMachineModel.find({}).exec();
        const {status, data, message}: { status: string, message: string, data: undefined } = response.body;
        expect(response.status).toBe(404);
        expect(status).toBe('failed');
        expect(message).toContain('не найдены');
        expect(data).toBeUndefined();
        expect(dbData.length).toEqual(1);
        done();
      });

  test(
      'DELETE - /api/washingMachine/model - delete all machines with the same model',
      async (done: DoneCallback): Promise<void> => {
        const model: string = 'testing model';
        const response: supertest.Response = await request(app).
            delete('/api/washingMachine/model').
            send({
              model,
            });
        const dbData = await WashingMachineModel.find({}).exec();
        const {status, data, message}: { status: string, data: string, message: undefined } = response.body;
        expect(response.status).toBe(200);
        expect(status).toBe('success');
        expect(message).toBeUndefined();
        expect(data).toContain(model);
        expect(dbData.length).toEqual(0);
        done();
      });
});
