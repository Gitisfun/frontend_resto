import httpClient from "../httpClient";

const END_POINT = "/products";

const getAllProducts = (queryString) => httpClient.get(`${END_POINT}`, {
    params: {
      categories: queryString.categories,
      search: queryString.search,
      page: queryString.page,
      limit: queryString.limit,
    },
  });

  const getSimpleAllProduct = (queryString) => httpClient.get(`${END_POINT}/all`, {
    params: {
      dummy: queryString
    },
  });

const getProduct = (id) => httpClient.get(`${END_POINT}/${id}`);

const createProduct = (product) => httpClient.post(END_POINT, product);

const updateProduct = (id, product) => httpClient.put(`${END_POINT}/${id}`, product);

const deleteProduct = (id) => httpClient.delete(`${END_POINT}/${id}`);

export { getAllProducts, getSimpleAllProduct, getProduct, createProduct, updateProduct, deleteProduct };