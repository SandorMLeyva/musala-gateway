import app from '../app';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { PeripheralStatus } from '@gateway/models';

let testServer;
beforeAll(() => {
  const port = 4445;
  const mongoAddr = 'mongodb://localhost';
  const db = 'test-peripheral';

  mongoose.connect(`${mongoAddr}/${db}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  testServer = app.listen(port);
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase();
  testServer.close(done);
});

describe("Test peripheral's CRUD", function () {
  it('Create a peripheral without id', function (done) {
    request(app)
      .post('/api/v1/peripheral')
      .send({
        uid: 1,
        vendor: 'Musala',
        status: PeripheralStatus.offline,
      })
      .expect((result) => {
        if (result.body.uid !== 1) {
          throw new Error(`Expected 1 Response ${result.body.uid}`);
        }
        if (result.body.vendor !== 'Musala') {
          throw new Error(`Expected Musala Response ${result.body.vendor}`);
        }
        if (result.body.status !== PeripheralStatus.offline) {
          throw new Error(`Expected 0 Response ${result.body.status}`);
        }
      })
      .expect(201, done);
  });

  it('Create a peripheral with id', function (done) {
    request(app)
      .post('/api/v1/peripheral')
      .send({
        _id: '1fa9610e0879a10360b23764',
        uid: 2,
        vendor: 'Musala',
        status: PeripheralStatus.offline,
      })
      .expect((result) => {
        if (result.body.uid !== 2) {
          throw new Error(`Expected 2 Response ${result.body.uid}`);
        }
        if (result.body.vendor !== 'Musala') {
          throw new Error(`Expected Musala Response ${result.body.vendor}`);
        }
        if (result.body.status !== PeripheralStatus.offline) {
          throw new Error(`Expected 0 Response ${result.body.status}`);
        }
        if (result.body._id !== '1fa9610e0879a10360b23764') {
          throw new Error(
            `Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`
          );
        }
      })
      .expect(201, done);
  });

  it('List peripherals', function (done) {
    request(app)
      .get('/api/v1/peripheral')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body.length !== 2)
          throw new Error(`Expected 2 Response ${result.body.length}`);
      })
      .expect(200, done);
  });

  it('Get peripheral', function (done) {
    request(app)
      .get('/api/v1/peripheral/1fa9610e0879a10360b23764')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body._id !== '1fa9610e0879a10360b23764')
          throw new Error(
            `Expected 1fa9610e0879a10360b23764 Response ${result.body._id}`
          );
      })
      .expect(200, done);
  });

  it('Update peripheral', function (done) {
    request(app)
      .put('/api/v1/peripheral/1fa9610e0879a10360b23764')
      .send({
        uid: 2,
        vendor: 'Musala-Update',
        status: PeripheralStatus.online,
      })
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body.uid !== 2) {
          throw new Error(`Expected 2 Response ${result.body.uid}`);
        }
        if (result.body.vendor !== 'Musala-Update') {
          throw new Error(
            `Expected Musala-Update Response ${result.body.vendor}`
          );
        }
        if (result.body.status !== PeripheralStatus.online) {
          throw new Error(`Expected 1 Response ${result.body.status}`);
        }
        if (result.body._id !== '1fa9610e0879a10360b23764') {
          throw new Error(
            `Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`
          );
        }
      })
      .expect(200, done);
  });

  it('Delete peripheral', function (done) {
    request(app)
      .delete('/api/v1/peripheral/1fa9610e0879a10360b23764')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Check delete', function (done) {
    request(app)
      .get('/api/v1/peripheral')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body.length !== 1)
          throw new Error(`Expected 1 Response ${result.body.length}`);
      })
      .expect(200, done);
  });
});

describe("Test peripheral's CRUD validations", function () {
  

  it('Try to get non-existent peripheral, expected 404', function (done) {
    request(app)
      .get('/api/v1/peripheral/2fa9610e0879a10360b23763')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('Try to update non-existent peripheral, expected 404', function (done) {
    request(app)
      .put('/api/v1/peripheral/2fa9610e0879a10360b23763')
      .expect(404, done);
  });

  it('Try to delete non-existent peripheral, expected 404', function (done) {
    request(app)
      .delete('/api/v1/peripheral/2fa9610e0879a10360b23763')
      .expect(404, done);
  });
});
