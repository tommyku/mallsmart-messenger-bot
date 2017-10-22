const MongoClient = require('mongodb').MongoClient;
const MongoURL = 'mongodb://localhost:27017/mongo';

let instance = null;

class DB {
  static getInstance() {
    return instance;
  }

  static initialize() {
    if (!instance) {
      MongoClient.connect(MongoURL, function(err, db) {
        // simplified mall index
        instance = db;
        db.dropDatabase();
        let pictures = [
          'MenFashion1_Dunhill.png',
          'MenFashion2_MassimoDutti.png',
          'MenFashion3_Zegna.png',
          'MenFashion4_MontBlanc.png',
          'MenFashion5_Jaeger.png'
        ];
        ['dunhill', 'Massimo Dutti', 'Ermenegildo Zegna', 'Montblanc', 'Jaeger-LeCoultre'].forEach((name, index) => {
          db.collection('shops').insertOne({
            type: 'boyfriend',
            name: name,
            picture: `https://tommyku.github.io/smartone-static/4/${pictures[index]}`
          });
        });

        let restaurantPictures = [
          'Inagiku_Japan1.png',
          'Sushi_SEI_Japan2.png',
          'Ten-Musubi_Japan5.png',
          'Tonkichi_Japan3.png',
          'sen-ryo_Japan4.png'
        ];

        ['Inagiku Grande Japanese Restaurant', 'sen-ryo', 'Sushi Sei', 'Ten-Musubi', 'Tonkichi'].forEach((name, index) => {
          db.collection('shops').insertOne({
            type: 'japanese',
            name: name,
            picture: `https://tommyku.github.io/smartone-static/67/${restaurantPictures[index]}`
          });
        });

        const sales = [{shop: 'Massimo Dutti', direction: 'https://tommyku.github.io/smartone-static/89/MapToDutti.png', picture: 'https://tommyku.github.io/smartone-static/89/MassimoDutti_30_off.png', sale: '30% sales'}];
        sales.forEach((sale) => {
          db.collection('quick_sales').insertOne(sale);
        });
      });
    }
  }
}

module.exports = DB;
