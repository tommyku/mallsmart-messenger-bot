class Recommendation {
  static getRecommendation(intent, entities) {
    switch(intent) {
      case 'RM_FASHION':
        break;
      case 'RM_ENTERTAINMENT':
        break;
      case 'RM_RESTAURANT':
        break;
      case 'RM_ANYTHING':
        break;
    }
  }

  static getRecommendationForUser(type, user_id) {
    return Recommendation.getRecommendation('RM_ANYTHING', entities)
  }
}

module.exports = Recommendation;

