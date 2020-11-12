import app from '../app';
import * as mongoose from 'mongoose';
import * as request from 'supertest';

let testServer;
beforeAll(() => {
  const port = 4444;
  const mongoAddr = 'mongodb://localhost';
  const db = 'test-gateway';

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

describe("Test gateway's CRUD", function () {
  it('Create a gateway without id', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        serial: 'SM-TEST-SERIAL',
        name: 'Test-Server',
        ipv4Address: '192.168.1.1',
      })
      .expect((result) => {
        if (result.body.serial !== 'SM-TEST-SERIAL') {
          throw new Error(
            `Expected SM-TEST-SERIAL Response ${result.body.serial}`
          );
        }
        if (result.body.name !== 'Test-Server') {
          throw new Error(`Expected Test-Server Response ${result.body.name}`);
        }
        if (result.body.ipv4Address !== '192.168.1.1') {
          throw new Error(
            `Expected 192.168.1.1 Response ${result.body.ipc4Address}`
          );
        }
      })
      .expect(201, done);
  });

  it('Create a gateway with id', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        _id: '5fa9610e0879a10360b23764',
        serial: 'SM-TEST2-SERIAL',
        name: 'Test-Server',
        ipv4Address: '192.168.1.2',
      })
      .expect((result) => {
        if (result.body.serial !== 'SM-TEST2-SERIAL') {
          throw new Error(
            `Expected SM-TEST-SERIAL Response ${result.body.serial}`
          );
        }
        if (result.body.name !== 'Test-Server') {
          throw new Error(`Expected Test-Server Response ${result.body.name}`);
        }
        if (result.body.ipv4Address !== '192.168.1.2') {
          throw new Error(
            `Expected 192.168.1.1 Response ${result.body.ipc4Address}`
          );
        }
        if (result.body._id !== '5fa9610e0879a10360b23764') {
          throw new Error(
            `Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`
          );
        }
      })
      .expect(201, done);
  });

  it('List gateways', function (done) {
    request(app)
      .get('/api/v1/gateway')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body.length !== 2)
          throw new Error(`Expected 2 Response ${result.body.length}`);
      })
      .expect(200, done);
  });

  it('Get gateway', function (done) {
    request(app)
      .get('/api/v1/gateway/5fa9610e0879a10360b23764')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body._id !== '5fa9610e0879a10360b23764')
          throw new Error(
            `Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`
          );
      })
      .expect(200, done);
  });

  it('Update gateway', function (done) {
    request(app)
      .put('/api/v1/gateway/5fa9610e0879a10360b23764')
      .send({
        serial: 'SM-TEST2-SERIAL-UPDATED',
        name: 'Test-Server-Updated',
        ipv4Address: '192.168.1.4',
      })
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body.serial !== 'SM-TEST2-SERIAL-UPDATED') {
          throw new Error(
            `Expected SM-TEST2-SERIAL-UPDATED Response ${result.body.serial}`
          );
        }
        if (result.body.name !== 'Test-Server-Updated') {
          throw new Error(
            `Expected Test-Server-Updated Response ${result.body.name}`
          );
        }
        if (result.body.ipv4Address !== '192.168.1.4') {
          throw new Error(
            `Expected 192.168.1.4 Response ${result.body.ipc4Address}`
          );
        }
        if (result.body._id !== '5fa9610e0879a10360b23764') {
          throw new Error(
            `Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`
          );
        }
      })
      .expect(200, done);
  });

  it('Delete gateway', function (done) {
    request(app)
      .delete('/api/v1/gateway/5fa9610e0879a10360b23764')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Check delete', function (done) {
    request(app)
      .get('/api/v1/gateway')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result) => {
        if (result.body.length !== 1)
          throw new Error(`Expected 1 Response ${result.body.length}`);
      })
      .expect(200, done);
  });
});

describe("Test gateway's CRUD validations", function () {
  it('Create a gateway', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        serial: 'SM-TEST3-SERIAL',
        name: 'Test-Server',
        ipv4Address: '192.168.1.2',
      })
      .expect(201, done);
  });

  it('Create a gateway with the same serial, expected 400', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        serial: 'SM-TEST3-SERIAL',
        name: 'Test-Server',
        ipv4Address: '192.168.1.2',
      })
      .expect(400, done);
  });

  it('Create a gateway with wrong IP', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        serial: 'SM-TEST4-SERIAL',
        name: 'Test-Server',
        ipv4Address: '192.168.1.500',
      })
      .expect(400, done);
  });
  it('Create a gateway with wrong IP 2', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        serial: 'SM-TEST4-SERIAL',
        name: 'Test-Server',
        ipv4Address: '200.01.4.1',
      })
      .expect(400, done);
  });
  it('Create a gateway with wrong IP 4', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        serial: 'SM-TEST4-SERIAL',
        name: 'Test-Server',
        ipv4Address: '1.1.404.1',
      })
      .expect(400, done);
  });
  it('Create a gateway with wrong IP 3', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        serial: 'SM-TEST4-SERIAL',
        name: 'Test-Server',
        ipv4Address: 'non-ip',
      })
      .expect(400, done);
  });

  it('Try to get non-existent gateway, expected 404', function (done) {
    request(app)
      .get('/api/v1/gateway/2fa9610e0879a10360b23763')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('Try to update non-existent gateway, expected 404', function (done) {
    request(app)
      .put('/api/v1/gateway/2fa9610e0879a10360b23763')
      .expect(404, done);
  });

  it('Try to delete non-existent gateway, expected 404', function (done) {
    request(app)
      .delete('/api/v1/gateway/2fa9610e0879a10360b23763')
      .expect(404, done);
  });
});

describe('Test gateway and peripheral relation', function () {
  it('Create a gateway to add peripheral', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        _id: '1fa9310e0871a10760b23725',
        serial: 'SM-TEST-SERIAL-PERIPHERAL',
        name: 'Test-Server-Peripheral',
        ipv4Address: '192.168.1.8',
      })
      .expect(201, done);
  });

  for (let i = 0; i < 10; i++) {
    it('Create a peripheral with id', function (done) {
      request(app)
        .post('/api/v1/peripheral')
        .send({
          _id: `1fa9610a0879c10330c2217${i}`,
          uid: 21,
          vendor: `Musala-${i}`,
          status: true,
          gateway: '1fa9310e0871a10760b23725',
        })
        .expect((result) => {
          if (result.body.gateway !== '1fa9310e0871a10760b23725') {
            throw new Error(
              `Expected 1fa9310e0871a10760b23725 Response ${result.body.gateway}`
            );
          }
        })
        .expect(201, done);
    });
  }
  it('Limit of peripheral on gateway', function (done) {
    request(app)
      .post('/api/v1/peripheral')
      .send({
        _id: `1fa9610e0879c10330c22178`,
        uid: 21,
        vendor: `Musala-10`,
        status: true,
        gateway: '1fa9310e0871a10760b23725',
      })
      .expect(400, done);
  });

  it("Check gateway's peripheral", function (done) {
    request(app)
      .get('/api/v1/gateway/1fa9310e0871a10760b23725/peripheral')
      .expect((result) => {
        if (result.body.length !== 10)
          throw new Error(`Expected 10 Response ${result.body.length}`);
      })
      .expect(200, done);
  });
});
