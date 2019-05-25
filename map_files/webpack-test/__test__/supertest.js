const request = require('./supertest');

const server = 'http://localhost:3000';

//testing route to get/wood
describe('Route integration', () => { 
    describe('/api/wood', () => {
      describe('GET', () => {
        // Note that we return the evaluation of `request` here! It evaluates to
        // a promise, so Jest knows not to say this test passes until that
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('responds with 200 status and text/html content type', () => {
          return request(server)
            .get('/api/wood')
            .expect('Content-Type', /text\/html/)
            .expect(200);  
        });
      });
    });
    describe('/api/stain', () => {
        describe('GET', () => {
          it('responds with 200 status and text/html content type', () => {
            return request(server)
              .get('/api/stain')
              .expect('Content-Type', /text\/html/)
              .expect(200);  
          });
        });
      });
});