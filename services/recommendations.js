class Recommendation {
  static getRecommendation(entities, DB) {
    const tag = ((entities) => {
      return entities[0].entity;
    })(entities);

    return DB.getInstance().collection('shops').find({type: tag});
  }

  static getRecommendationForUser(type, user_id, DB) {
  }
}

module.exports = Recommendation;

