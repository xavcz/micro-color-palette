// Packages
const { test, expect } = global;
const micro = require('micro');
const listen = require('test-listen');
const fetch = require('node-fetch');

// Ours
const services = [
  // micro color palette service to test
  micro(require('../src')),
  // assets service to serve test images
  require('../assets'),
];

const types = require('../src/types');
const getAssetsList = require('../assets/list');

// async utility to run a server from a given service
const runServer = async service => {
  const url = await listen(service);

  return { service, url };
};

// get the list of all the assets to tests
// ⚠️ this function reads the /assets directory in SYNC way,
// to provide the test runner with direct access to them
const assetsList = getAssetsList();

// map each types to create a test definition with the corresponding asset,
// followed by the corresponding test
Object.keys(types)
  // get the tests definition
  .map(type => ({
    name: type,
    type: types[type],
    file: assetsList.find(img => img.includes(type)),
  }))
  // run the tests for each definition
  .map(({ name, type, file }) =>
    test(`get color palette from a .${name} (asset: ${file})`, async () => {
      // start up the servers
      const servers = await Promise.all(services.map(runServer));
      const [micro, assets] = servers;

      const res = await fetch(micro.url, {
        method: 'POST',
        body: JSON.stringify({
          src: `${assets.url}/${file}`,
          type,
        }),
      });

      const palette = await res.json();

      expect(palette).toMatchSnapshot();

      // "clean up" by killing the servers
      servers.forEach(server => server.service.close());
    })
  );
