const micro = require('micro');
const listen = require('test-listen');
const fetch = require('node-fetch');
const { describe, it, expect } = global;
const microColorPalette = require('./index');

describe('micro-color-palette', () => {
  it('works', async done => {
    const service = micro(microColorPalette);

    const url = await listen(service);
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ src: 'https://raw.githubusercontent.com/zeit/art/31913be3107827adf10e1f491ec61480f63e19af/micro/logo.png' }),
    });

    const palette = await res.json();

    expect(palette).toMatchSnapshot();
    done();
  });
});
