'use strict';
const { transactionGetById } = require("../../database/dynamoDB");
const { joinProductWithStock } = require("../../database/helpers");

module.exports.handler = async (event) => {
  console.log('Log: ', event);

  const id = event.pathParameters.id;
  const { data: { product, stock }, isError } = await transactionGetById(id);

  if (isError) {
    return {
      statusCode: 500,
      error: JSON.stringify({
        error: `Occured an error in the server`
      })
    }
  }

  if (product && stock) {
    const joinedItem = joinProductWithStock(product, stock);

    return {
      statusCode: 200,
      body: JSON.stringify(joinedItem)
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({
      error: `Product "${id}" not found`
    })
  };
};
