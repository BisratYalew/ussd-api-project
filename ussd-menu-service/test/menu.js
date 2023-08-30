//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

const menuData = require('../data/menus');


chai.use(chaiHttp);
//Our parent block
describe('Menu', () => {
    beforeEach((done) => { //Before each test we empty the database
        menuData.welcome && done()
    });
  /*
  * Test the /GET route
  */
  describe('/GET welcome page for unauthenticated users', () => {
      it('it should welcome for unauthenticated users', (done) => {
        chai.request(server)
            .post('/start')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });
  });

});