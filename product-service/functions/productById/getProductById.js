'use strict';

module.exports.handler = async (event) => {
  const products = await import('../../mocks/products.json', { assert: { type: "json" } });
  const id = event.pathParameters.id;
  const foundItem = products.default.find(product => product.id === id);

  if (foundItem) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(foundItem)
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({
      error: `Product "${id}" not found`
    })
  };
};
