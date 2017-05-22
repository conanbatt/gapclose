const express = require('express')
const next = require('next')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

var proxy = require('express-http-proxy');

var apiProxy = proxy(process.env.API_HOST, {
  proxyReqPathResolver: function (req, res) {
      return require('url').parse(req.baseUrl).path;
  }
});

app.prepare().then(() => {
  const server = express()

  server.use('/api/*', apiProxy)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})