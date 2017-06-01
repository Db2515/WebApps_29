const request = require('supertest');
const app = require('../server');

describe('Routing Test', () => {
    it('Root page gives html file with status 200', (done) => {
        request(app).get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});
