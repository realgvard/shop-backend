import { assert, test, describe } from 'vitest';
import { handler as createProduct } from '../createProduct';
const products = require('../../../mocks/products.json');

describe('createProduct', () => {
  test('Handler should return 204 status', async () => {
    const response = await createProduct();
    const expectedResponse = {
      statusCode: 204
    };

    assert.deepEqual(response, expectedResponse)
  });

})
