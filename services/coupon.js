const axios = require('axios');

class Coupon {
  static getCouponEntitiesForUser(user_id) {
    const ENDPOINT = 'https://ussouthcentral.services.azureml.net/workspaces/3b250cbed4fa4f57b806c8f33f326fb4/services/5920e232c059458fa7dc4492aba9c3ff/execute?api-version=2.0&details=true';
    const request = {
      url: ENDPOINT,
      responseType: 'json',
      method: 'post',
      headers: {
        'Authorization': 'Bearer 31nvbpVIJBDAgzwd9ZASTJs25pCxislj2bOuVNYWpncSVA3kPvPtQQaLawgzvYn5RofgPEer0ufMBd0oF4Z0Ug=='
      },
      data: {
        Inputs: {
          input1: {
            ColumnNames: [
              'user_id'
            ],
            Values: [
              [ user_id ],
              [ user_id ]
            ]
          }
        },
        GlobalParameters: {}
      }
    };
    return axios.request(request);
  }

  static getCouponInTag(tag, DB) {
    const cursor = DB.getInstance().collection('coupons').find({
      tag: tag
    })
    return cursor.toArray();
  }
}

module.exports = Coupon;

