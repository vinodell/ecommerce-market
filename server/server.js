import express from 'express'
import path from 'path'
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const Root = () => ''

let connections = []

const getLogs = () => {
  return readFile(`${__dirname}/data/logs.json`, { encoding: 'utf8' })
    .then((file) => JSON.parse(file))
    .catch(async () => {
      await writeFile(`${__dirname}/data/logs.json`, '[]', { encoding: 'utf8' })
      return []
    })
}

const setLogs = (body, logs) => {
  return writeFile(`${__dirname}/data/logs.json`, JSON.stringify([body, ...logs]), {
    encoding: 'utf8'
  })
}

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/goods', async (req, res) => {
  const readGoods = await readFile(`${__dirname}/data/sale.json`, { encoding: 'utf8' })
    .then((file) => JSON.parse(file))
    .catch(() => ({ result: 'empty stock' }))
  res.json(readGoods)
})

server.get('/api/v1/rates', async (req, res) => {
  const rates = await axios('https://api.exchangeratesapi.io/latest?base=USD').then(
    ({ data }) => data.rates
  )
  res.json(rates)
})

server.get('/api/v1/logs', async (req, res) => {
  const logs = await getLogs()
  res.json(logs)
})

server.post('/api/v1/logs', async (req, res) => {
  const logs = await getLogs()
  await setLogs(req.body, logs)
  res.send('logs updated')
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
