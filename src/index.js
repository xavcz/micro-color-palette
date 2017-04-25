const { json, send } = require('micro');
const fetch = require('node-fetch');
const getColors = require('get-image-colors');

module.exports = async req => {
  try {
    // parse the body to extract the remote image source and the image type
    const { src, type = 'png' } = await json(req);

    // get the remote image data
    const remoteImg = await fetch(src);

    // transform it in a buffer
    const buffer = await remoteImg.buffer();

    // extract its color palette as a chroma.js object
    const colors = await getColors(buffer, `image/${type}`);

    // return the palette with hex codes
    return colors.map(color => color.hex());
  } catch (err) {
    console.log(err);
    send(res, 500, 'no, no, nope. error!');
  }
};
