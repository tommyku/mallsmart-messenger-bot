class Recommendation {
  static getRecommendation(entities, DB) {
    const tag = ((entities) => {
      return entities[0].entity;
    })(entities);
    console.log(tag);
    return DB.getInstance().collection('shops').find({type: tag});
  }

  static getInstantRecommendation(DB) {
    //const cursor = DB.getInstance().collection('quick_sales').find();
    //const sales = [];
    //cursor.each((err, doc) => {
      //if (doc !== null) sales.push(doc);
    //});
    //if (sales.length > 0) {
      //return sales[Math.floor(Math.random() * sales.length)];
    //} else {
      //return null;
    //}
    const sales = [{shop: 'Massimo Dutti', direction: 'https://tommyku.github.io/smartone-static/89/MapToDutti.png', picture: 'https://tommyku.github.io/smartone-static/89/MassimoDutti_30_off.png', sale: '30% sales'}];
    if (sales.length > 0) {
      return sales[Math.floor(Math.random() * sales.length)];
    } else {
      return null;
    }
  }

  static getRecommendationForUser(type, user_id, DB) {
  }
}

module.exports = Recommendation;

