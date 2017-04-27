const { test, expect, beforeAll, afterAll } = global;
const micro = require('micro');
const listen = require('test-listen');
const fetch = require('node-fetch');

// services definitions
const services = [
  // micro color palette service to test
  micro(require('../src/index')),
  // assets service to serve test images
  require('../assets'),
];

// async function to run a server from a service
const runServer = async service => {
  const url = await listen(service);

  return { service, url };
};

// clean servers for the tests
let servers;

beforeAll(async () => {
  servers = await Promise.all(services.map(runServer));
});

afterAll(() => {
  servers.forEach(server => server.service.close());
});

test('works', async () => {
  const [micro, assets] = servers;

  const res = await fetch(micro.url, {
    method: 'POST',
    body: JSON.stringify({
      src: assets.url + '/micro.png',
    }),
  });

  const palette = await res.json();

  expect(palette).toMatchSnapshot();
});
