import { assert, test, describe } from 'vitest';
import { handler as getProductsList } from '../getProductsList';
const products = require('../../../mocks/products.json');

describe('getProductsList', () => {
  test('Return list of products with status 200', async () => {
    const response = await getProductsList();
    const expectedResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(products)
    };

    assert.deepEqual(response, expectedResponse)
  });

})
