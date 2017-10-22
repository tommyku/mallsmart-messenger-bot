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
const Coupon = require('./services/coupon.js');
const MongoClient = require('mongodb').MongoClient;
const MongoURL = 'mongodb://localhost:27017/mongo';
let MongoDb;

MongoClient.connect(MongoURL, function(err, db) {
  MongoDb = db;
  db.dropDatabase();
  ['dunhill', 'Massimo Dutti', 'Ermenegildo Zegna', 'Montblanc', 'Jaeger-LeCoultre'].forEach((name) => {
    db.collection('shops').insertOne({
      type: 'male',
      name: name,
    });
  });

  const cursor = db.collection('shops').find({type: 'male'});
  cursor.each((err, doc) => {
    console.log(err);
    console.log(doc);
  })
});

const DEMO_USER_COUPON_USER = 94; // slide 18
const DEMO_USER_ENTERTAINMENT_USER = 64; // slide 20

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
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

  bp.hear(/GET_STARTED/i, (event, next) => {
       // See the file `content.yml` to see the block
  bp.hear({ platform: 'facebook', type: 'postback' }, (event, next) => {
    const postback = event.raw.postback;
    if (postback.title === 'Browse More') {
      event.reply(`#${postback.payload}`);
    }
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
