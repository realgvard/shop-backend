'use strict';

module.exports.handler = async () => {
  const products = await import('../../mocks/products.json', { assert: { type: "json" } });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(products.default)
  };
};
