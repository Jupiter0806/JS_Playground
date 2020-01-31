import chai from 'chai';
import chaiHttp from 'chai-http';

import app from './index';

chai.use(chaiHttp);

describe("app", () => {
  it('/', () => 
    chai.request(app)
      .get('/')
      .then(res => {
        chai.expect(res.status).eq(200);
        return;
      })
  );

  it('/test', () =>
    chai.request(app)
      .get('/test')
      .then(res => {
        chai.expect(res.status).eq(200);
        chai.expect(res.text).eq('test');
      })
  );
});