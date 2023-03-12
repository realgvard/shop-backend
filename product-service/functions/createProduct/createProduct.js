'use strict';
const { transactionPut} = require("../../database/dynamoDB");
const { object, string, number } = require("yup");
const { randomUUID } = require('crypto');

let productSchema = object({
  title: string().required(),
  description: string().required(),
  price: number().required().positive(),
  count: number().required().min(1).integer()
});


module.exports.handler = async (event) => {
  console.log('Log:', event);

  const parsedBody = JSON.parse(event.body);

  if (!productSchema.isValidSync(parsedBody)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid incoming data',
      })
    }
  }

  const id = randomUUID();
  const product = {
    id,
    title: parsedBody.title,
    description: parsedBody.description,
    price: parsedBody.price,
    count: parsedBody.count,
  };
  const stock = {
    product_id: id,
    count: parsedBody.count,
  };
  const response = await transactionPut(product, stock);

  if (response.isError) {
    return {
      statusCode: 500
    };
  }

  return {
    statusCode: 204,
    body: JSON.stringify({
      message: 'Product has been created'
    })
  };
};
