exports.config = {
  tests: 'test/acceptance/*.test.js',
  output: './test/acceptance/_output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8081'
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'my-interpreter'
}