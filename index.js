const Koa = require('koa')
const router = require('koa-router')()
const request = require('request-promise')
const app = new Koa()
router.get('/api/events', async ctx => {
  let events = JSON.parse(await request(`https://graph.facebook.com/v2.12/Saengerschaftborussia/events/?access_token=${token}&debug=all&format=json&method=get&pretty=0&suppress_http_code=1`))
  let eventsWithPicture = await Promise.all(
    events.data.map(async event => {
      let image = await request(`https://graph.facebook.com/v2.12/${event.id}/picture?access_token=${token}&debug=all&format=json&method=get&pretty=0&suppress_http_code=1&type=large`, {encoding: null})
      event.picture = image.toString('base64')
      return event
    })
  )
  ctx.body = eventsWithPicture
  ctx.set('Access-Control-Allow-Origin', '*')
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
