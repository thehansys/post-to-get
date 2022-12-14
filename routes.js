// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')
const fs = require('fs')
const util = require('util');
const {transformMethod} = require("@layer0/core/transform");
const exec = util.promisify(require('child_process').exec);
import { POST_BODY_QUERY_PARAM } from '@layer0/core/constants'

const cacheConfig = {
    edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
        forcePrivateCaching: true
    },
    browser: {
        serviceWorkerSeconds: 60 * 60 * 24,
        convertToGet: true // convert POSTs to GETs so we can prefetch and cache them
    }
}

module.exports = new Router()

.match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
})

.post('/post', (res) => {
    res.cache(cacheConfig)
    res.proxy('postProxy')
})

.get('/post', (res) => {
    res.setResponseHeader("Cache-Control","public, max-age=604800")
    res.cache(cacheConfig)
    res.proxy('postProxy', {
        transformRequest: transformMethod('post')
    })
})

.use(nextRoutes)
