const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });


async function scanProducts() {
  const response = await dynamo.scan({
    TableName: process.env.PRODUCTS_TABLE
  }).promise().catch(error => {
    return {
      isError: true,
      error
    }
  });

  if (response.isError) {
    return response;
  }

  return {
    data: response.Items
  };
}

async function scanStocks() {
  const response = await dynamo.scan({
    TableName: process.env.STOCKS_TABLE
  }).promise().catch(error => {
    return {
      isError: true,
      error
    }
  });

  if (response.isError) {
    return response;
  }

  return {
    data: response.Items
  };
}

async function transactionGetById(id) {
  const response = await dynamo.transactGet({
    TransactItems: [
      {
        Get: {
          TableName : process.env.PRODUCTS_TABLE,
          Key: {
            id
          }
        }
      }, {
        Get: {
          TableName : process.env.STOCKS_TABLE,
          Key: {
            product_id: id
          }
        }
      }
    ]}).promise().catch(error => {
      return {
        isError: true,
        error
      }
  });

  if (response.isError) {
    return response;
  }

  return {
    data: {
      product: response.Responses[0]?.Item,
      stock: response.Responses[1]?.Item
    }
  };
}

async function transactionPut(product, stock) {
  const response = await dynamo.transactWrite({
    TransactItems: [
      {
        Put: {
          TableName : process.env.PRODUCTS_TABLE,
          Item: product
        }
      }, {
        Put: {
          TableName : process.env.STOCKS_TABLE,
          Item: stock
        }
      }
    ]}).promise().catch(error => {
    return {
      isError: true,
      error
    }
  });

  if (response.isError) {
    return response;
  }

  return {
    isSuccess: true
  };
}

module.exports = {
  scanProducts,
  scanStocks,
  transactionGetById,
  transactionPut,
};
