import { assert, test, describe } from 'vitest';
import { handler as getProductById } from '../getProductById';

describe('getProductById', () => {
  test('Return found item with status 200', async () => {
    const seekId = "7567ec4b-b10c-48c5-9345-fc73c48a80a3";
    const response = await getProductById({ pathParameters: { id: seekId } });
    const expectedFoundItem = {
      "description": "Short Product Description2",
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
      "price": 23,
      "title": "Product"
    };
    const expectedResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(expectedFoundItem)
    };

    assert.deepEqual(response, expectedResponse)
  });

  test('Return empty response with status 404 if product not found', async () => {
    const seekId = "123";
    const response = await getProductById({ pathParameters: { id: seekId } });
    const expectedResponse = {
      statusCode: 404,
      body: JSON.stringify({
        error: `Product "${seekId}" not found`
      })
    };

    assert.deepEqual(response, expectedResponse)
  });

})
