const axios = require('axios');

class Intent {
  static getIntent(text) {
    return axios.get(`https://eastus2.api.cognitive.microsoft.com/luis/v2.0/apps/8a40f0af-e9b7-4171-9e86-5a1c405007a5?subscription-key=0262b9e06ac346588c5254967b919063&timezoneOffset=0&verbose=true&q=${text}`);
  }
}

module.exports = Intent;
