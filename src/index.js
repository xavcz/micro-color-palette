// Packages
const { json, send } = require('micro');
const fetch = require('node-fetch');
const getColors = require('get-image-colors');

// Ours
const { png: defaultType } = require('./types');

module.exports = async (req, res) => {
  try {
    // parse the body to extract the remote image source and the image type
    const { src, type = defaultType } = await json(req);

    // get the remote image data
    const remoteImg = await fetch(src);

    // transform it in a buffer
    const buffer = await remoteImg.buffer();

    // extract its color palette as a chroma.js object
    const colors = await getColors(buffer, type);

    // return the palette with hex codes, while ensuring they are unique colors
    // note: chroma.js transformation on svg seems to not filter duplicates
    return colors
      .map(color => color.hex())
      .filter((color, index, palette) => palette.indexOf(color) === index);
  } catch (err) {
    console.log(err); // eslint-disable-line
    send(res, 500, 'no, no, nope. error!');
  }
};
