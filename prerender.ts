// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import { readFileSync, outputFileSync } from 'fs-extra'
import { resolve } from 'path'
// @ts-ignore
import { render } from './dist/server/entryServer.js'
const manifest = require('./dist/static/ssr-manifest.json')

const toAbsolute = (p:string) => resolve(__dirname, p)
const template = readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')


// determine routes to pre-render from src/pages
// const routesToPrerender = readdirSync(toAbsolute('src/pages'))
//   .map((file) => {
//     const name = file.replace(/\.vue$/, '').toLowerCase()
//     return name === 'home' ? `/` : `/${name}`
//   })
const routesToPrerender = ['/pool/uranus']

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--ssr-outlet-->`, appHtml)

    
    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    outputFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  // unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()