'use strict';
const { transactionGetById } = require("../../database/dynamoDB");
const { joinProductWithStock } = require("../../database/helpers");
const {logError, logInfo} = require("../../helpers/logger");

module.exports.handler = async (event) => {
  const id = event.pathParameters.id;
  const { data: { product, stock }, isError, error } = await transactionGetById(id);

  if (isError) {
    logError(error, event);

    return {
      statusCode: 500,
      error: JSON.stringify({
        error: `Occured an error in the server`
      })
    }
  }

  if (product && stock) {
    const joinedItem = joinProductWithStock(product, stock);
    logInfo(200, event);

    return {
      statusCode: 200,
      body: JSON.stringify(joinedItem)
    };
  }

  logInfo(404, event);

  return {
    statusCode: 404,
    body: JSON.stringify({
      error: `Product "${id}" not found`
    })
  };
};
