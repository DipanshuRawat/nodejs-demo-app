// app.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should return greeting message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Hello from Node.js app');
  });
});
