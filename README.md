# micro-color-palette 🏞 ➡️ 🎨
Get the color palette of a remote image as a JSON Array. Works with PNG, JPG, GIF & SVG ⚡️

[![Build Status](https://travis-ci.org/xavcz/micro-color-palette.svg?branch=master)](https://travis-ci.org/xavcz/micro-color-palette) 

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/xavcz/micro-color-palette)

### how to use
Make a POST request with your favorite tool to the `micro`service with to get back its color palette:

```js
fetch('https://micro-color-palette-you-deployed.now.sh', {
  method: 'POST',
  body: JSON.stringify({
    src: 'https://somewhere.xyz/images/awesome-thing.svg',
    type: 'image/svg+xml',
  }),
})
.then(palette => {
  // do something with the palette
  console.log(palette); // ['#ffefd5', '#db7093', ...]
});
```

In case you want to get the palette of a PNG, you do not need to specify the `type` key in the payload you send:
```js
fetch('https://micro-color-palette-you-deployed.now.sh', {
  method: 'POST',
  body: JSON.stringify({
    src: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  }),
})
.then(palette => {
  console.log(palette); // ["#ec4434", "#34ac54", "#4484f4", "#fcbc04", "#a480d0"]
});
```

### run it

Dev:
```sh
yarn 
yarn dev
```

Test:
```sh
yarn test
```

Deploy:
```sh
now
```

### inspiration & credits
`micro`service inspired by [`micro-analytics-cli`](https://github.com/micro-analytics/micro-analytics-cli/) 📈
The SVG used in test has been made by [Sarah Drasner](https://twitter.com/sarah_edo), I recommend to [check the Codepen where it's from](http://codepen.io/sdras/pen/YZBGNp) ⚡️
