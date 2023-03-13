'use strict';
const { transactionPut} = require("../../database/dynamoDB");
const { object, string, number } = require("yup");
const { randomUUID } = require('crypto');
const {logInfo, logError} = require("../../helpers/logger");

let productSchema = object({
  title: string().required(),
  description: string().required(),
  price: number().required().positive(),
  count: number().required().min(1).integer()
});


module.exports.handler = async (event) => {
  const parsedBody = JSON.parse(event.body);

  if (!productSchema.isValidSync(parsedBody)) {
    logError({ message: 'Product schema is invalid', statusCode: 400 }, event);

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
    logError(response.error, event);

    return {
      statusCode: 500
    };
  }

  logInfo(204, event);

  return {
    statusCode: 204,
    body: JSON.stringify({
      message: 'Product has been created'
    })
  };
};
