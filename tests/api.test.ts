import request from 'supertest';
import mongoose, {Connection} from 'mongoose';

import {app} from '../app';
import {keys} from '../keys/keys';
import {IWashingMachine, WashingMachineModel} from '../models/WashingMachine';

import {describe} from '@jest/globals';
import supertest from 'supertest';

describe('Tests for endpoints', () => {
  let conn: Connection;
  beforeAll(async (): Promise<void> => {
    conn = mongoose.createConnection(keys.MONGO_LOCAL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        });

    conn.on('error', (): Error => {
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
    await conn.close()
  });


  test('POST - /api/washingMachine - empty body', async (done) => {
    const response: supertest.Response = await request(app).post('/api/washingMachine');
    const {status, data} : {status: string, data: string} = response.body
    expect(response.statusType).toBe(5)
    expect(response.status).toBe(500)
    expect(status).toBe('error')
    expect(data).toContain('validation failed')
    done()
  });

  test('POST - /api/washingMachine - with data', async (done) => {
    const response: supertest.Response = await request(app)
      .post('/api/washingMachine')
      .send({
      serialNumber: 936,
      model: 'testing model',
      dateOfManufacture: Date.now().toLocaleString(),
    })
    const {status, data} : {status: string, data: IWashingMachine} = response.body
    expect(response.statusType).toBe(2)
    expect(response.status).toBe(201)
    expect(status).toBe('success')
    expect(data).toBeInstanceOf(Object)
    expect(typeof data.model).toBe('string')
    expect(typeof data.serialNumber).toBe('number')
    expect(typeof data.dateOfManufacture).toBe('string')
    expect(typeof data.status).toBe('boolean')
    expect(data.status).toBeTruthy()
    expect(typeof data.washingCycles).toBe('number')
    expect(data.washingCycles).toEqual(0)
    expect(data.historyOfErrors).toBeInstanceOf(Array)
    done()
  })

  test('POST - /api/washingMachine - with data and existing serial number', async (done) => {
    const response: supertest.Response = await request(app)
    .post('/api/washingMachine')
    .send({
      serialNumber: 936,
      model: 'testing model',
      dateOfManufacture: Date.now().toLocaleString(),
    })
    const {status, data} : {status: string, data: string} = response.body
    expect(status).toBe('error')
    expect(data).toContain('duplicate key')
    done()
  })
});
