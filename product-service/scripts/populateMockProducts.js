const mockedProducts = require('../mocks/products');
const { randomUUID } = require("crypto");
const { transactionPut } = require("../database/dynamoDB");
const { object, string, number } = require("yup");

let productSchema = object({
  title: string().required(),
  description: string().required(),
  price: number().required().positive(),
  count: number().required().min(1).integer()
});

async function addNewProduct(data) {
  if (!productSchema.isValidSync(data)) return;

  const id = randomUUID();
  const product = {
    id,
    title: data.title,
    description: data.description,
    price: data.price,
    count: data.count,
  };
  const stock = {
    product_id: id,
    count: data.count,
  };
  const response = await transactionPut(product, stock);

  if (response.isError) {
    console.log('Happened error', response.error.message);
  }

  if (response.isSuccess) {
    console.log('Product successful added');
  }
}

mockedProducts.forEach(async product => {
  await addNewProduct(product);
});

