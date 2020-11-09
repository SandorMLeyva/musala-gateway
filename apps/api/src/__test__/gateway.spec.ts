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
          throw new Error(`Expected SM-TEST-SERIAL Response ${result.body.serial}`);
        }
        if (result.body.name !== 'Test-Server') {
          throw new Error(`Expected Test-Server Response ${result.body.name}`);
        }
        if (result.body.ipv4Address !== '192.168.1.1') {
          throw new Error(`Expected 192.168.1.1 Response ${result.body.ipc4Address}`);
        }
      })
      .expect(201, done);
  });

  it('Create a gateway with id', function (done) {
    request(app)
      .post('/api/v1/gateway')
      .send({
        "_id": "5fa9610e0879a10360b23764",
        "serial": "SM-TEST2-SERIAL",
        "name": "Test-Server",
        "ipv4Address": "192.168.1.2"
      })
      .expect((result)=>{
        if (result.body.serial !== 'SM-TEST2-SERIAL') {
          throw new Error(`Expected SM-TEST-SERIAL Response ${result.body.serial}`);
        }
        if (result.body.name !== 'Test-Server') {
          throw new Error(`Expected Test-Server Response ${result.body.name}`);
        }
        if (result.body.ipv4Address !== '192.168.1.2') {
          throw new Error(`Expected 192.168.1.1 Response ${result.body.ipc4Address}`);
        }
        if (result.body._id !== '5fa9610e0879a10360b23764') {
          throw new Error(`Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`);
        }
      })
      .expect(201, done);
  });

  it('List gateways', function (done) {
    request(app)
      .get('/api/v1/gateway')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result)=>{
         if(result.body.length !== 2)
           throw new Error(`Expected 2 Response ${result.body.length}`);
      })
      .expect(200, done);
  });

  it('Get gateway', function (done) {
    request(app)
      .get('/api/v1/gateway/5fa9610e0879a10360b23764')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((result)=>{
        if(result.body._id !== "5fa9610e0879a10360b23764")
           throw new Error(`Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`);
      })
      .expect(200, done);
  });

  it('Update gateway', function (done) {
    request(app)
      .put('/api/v1/gateway/5fa9610e0879a10360b23764')
      .send({
        "serial": "SM-TEST2-SERIAL-UPDATED",
        "name": "Test-Server-Updated",
        "ipv4Address": "192.168.1.4"
      })
      .expect('Content-Type', /json/)
      .expect((result)=>{
        if (result.body.serial !== 'SM-TEST2-SERIAL-UPDATED') {
          throw new Error(`Expected SM-TEST2-SERIAL-UPDATED Response ${result.body.serial}`);
        }
        if (result.body.name !== 'Test-Server-Updated') {
          throw new Error(`Expected Test-Server-Updated Response ${result.body.name}`);
        }
        if (result.body.ipv4Address !== '192.168.1.4') {
          throw new Error(`Expected 192.168.1.4 Response ${result.body.ipc4Address}`);
        }
        if (result.body._id !== '5fa9610e0879a10360b23764') {
          throw new Error(`Expected 5fa9610e0879a10360b23764 Response ${result.body._id}`);
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
      .expect((result)=>{
        if(result.body.length !== 1)
          throw new Error(`Expected 1 Response ${result.body.length}`);
      })
      .expect(200, done);
  });
});
