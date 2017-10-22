/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.

  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/

const axios = require('axios')
const Intent = require('./services/intent.js');
const Recommendation = require('./services/recommendations.js');
const Coupon = require('./services/coupon.js');
const DB = require('./services/db.js');

DB.initialize();

const DEMO_USER_COUPON_USER = 94; // slide 18
const DEMO_USER_ENTERTAINMENT_USER = 64; // slide 20

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger

  bp.hear(/GET_STARTED/i, (event, next) => {
    event.reply('#welcome') // See the file `content.yml` to see the block
  })

  bp.hear(/whatsup|yo|show/i, (event, next) => {
    event.reply('#menu')
  })

  // You can also pass a matcher object to better filter events
  bp.hear({
    type: /message|text/i,
    text: /exit|bye|goodbye|quit|done|leave|stop/i
  }, (event, next) => {
    console.log(event);
    event.reply('#goodbye', {
      // You can pass data to the UMM bloc!
      reason: 'unknown'
    })
  })

  bp.hear({ platform: 'facebook', type: 'quick_reply' }, (event, next) => {
    const payload = JSON.parse(event.text);
    if (payload.intent === 'reserve') {
      let update = {
        shop: payload.shop,
        user: event.user.id,
      };
      DB.getInstance().collection('reservations').updateOne(update, {
        shop: payload.shop,
        user: event.user.id,
        seats: payload.seats
      });
    }
    event.reply('#reservation_done', {
      seats: payload.seats,
      shop: payload.shop
    })
  });

  bp.hear({ platform: 'facebook', type: 'postback' }, (event, next) => {
    const postback = event.raw.postback;
    if (postback.title === 'Browse More') {
      event.reply(`#${postback.payload}`);
    }
    if (postback.title === 'Reserve Now') {
      DB.getInstance().collection('reservations').insertOne({
        shop: postback.payload,
        user: event.user.id,
        seats: 1
      });
      bp.messenger.sendText(event.user.id, 'How many people are coming?', {
        quick_replies: [
          { content_type: 'text', title: 'Only me', payload: JSON.stringify({shop: postback.payload, seats: '1', intent: 'reserve'}) },
          { content_type: 'text', title: '2 people', payload: JSON.stringify({shop: postback.payload, seats: '2', intent: 'reserve'}) },
          { content_type: 'text', title: '3-4 people', payload: JSON.stringify({shop: postback.payload, seats: '3', intent: 'reserve'}) },
          { content_type: 'text', title: 'More than 4', payload: JSON.stringify({shop: postback.payload, seats: '4+', intent: 'reserve'}) }
        ]
      });
    }
  })

  bp.hear(/jap/, (event, next) => {
    const restaurants = Recommendation.getRecommendation([{entity: 'japanese'}], DB);
    const elements = [];
    restaurants.each((err, doc) => {
      if (doc !== null) {
        elements.push({
          title: doc.name,
          image_url: doc.picture,
          buttons: [
            { type: 'postback', title: 'Reserve Now', payload: doc.name }
          ]
        });
      }
    });
    const template = {
      template_type: 'generic',
      elements: elements
    };
    bp.messenger.sendTemplate(event.user.id, template)
  })

  bp.wildCard = (bp, event, send) => {
    // get intent & entities
    console.log(event.text)
    Intent.getIntent(event.text)
      .then((result)=>{
        console.log(result.data.topScoringIntent.intent)
        console.log(result.data.entities)
      })
    // call service
  }
}
