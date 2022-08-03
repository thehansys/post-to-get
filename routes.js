// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')
const fs = require('fs')
const util = require('util');
const {transformMethod} = require("@layer0/core/transform");
const exec = util.promisify(require('child_process').exec);
import { POST_BODY_QUERY_PARAM } from '@layer0/core/constants'

module.exports = new Router()

    .match('/service-worker.js', ({ serviceWorker }) => {
        return serviceWorker('.next/static/service-worker.js')
    })

    .post('/post', (res) => {
        res.setResponseHeader('content-type', 'application/json');
        res.compute(async (request, response) => {
            return res.send(JSON.stringify({
                method : request.method,
                body : request.body,
                query : request.query,
                path : request.path,
                params : request.params,
                url : request.url,
                message : "This POST response"
            }), 200, 'OK')
        })
    })


    .get('/post', (res) => {
        res.cache({
            edge: {
                maxAgeSeconds: 60 * 60 * 24,
                staleWhileRevalidateSeconds: 60 * 60 * 24 * 365
            },
            browser: {
                serviceWorkerSeconds: 60 * 60 * 24,
                convertToGet: true // convert POSTs to GETs so we can prefetch and cache them
            }
        })
        res.proxy('localhostProxy', {
            transformRequest: transformMethod('post')
        })
    })

    .use(nextRoutes)
