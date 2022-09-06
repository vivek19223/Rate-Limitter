import test from 'ava';
import supertest from 'supertest';
import app from '../../server.js';
const request = supertest (app);

test ('/posts when one request is made', async t => {
  const {_body: data} = await request.get ('/posts');
  t.is (data.length, 100);
});

test ('/users when one request is made', async t => {
  const {_body: data} = await request.get ('/users');
  t.is (data.length, 10);
});

const makeMultipleCallsOnUser = (noOfRequest, endpoint) => {
  const apiArray = [];
  while (noOfRequest > 0) {
    apiArray.push (request.get (endpoint));
    noOfRequest -= 1;
  }
  return apiArray;
};

test ('/users when multiple request are made and API is throttled', async t => {
  let requestStatus = 'Pending';
  const data = await Promise.all (makeMultipleCallsOnUser (31, '/users'));
  data.forEach (({_body: entry}) => {
    if (entry.statusCode == 429) {
      requestStatus = 'Rejected';
      return;
    }
    requestStatus = 'Resolved';
  });
  t.is (requestStatus, 'Rejected');
});

test ('/posts when multiple request are made and API is throttled', async t => {
  let requestStatus = 'Pending';
  const data = await Promise.all (makeMultipleCallsOnUser (31, '/posts'));
  data.forEach (({_body: entry}) => {
    if (entry.statusCode == 429) {
      requestStatus = 'Rejected';
      return;
    }
    requestStatus = 'Resolved';
  });
  t.is (requestStatus, 'Rejected');
});
