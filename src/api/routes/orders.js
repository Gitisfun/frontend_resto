import httpClient from "../httpClient";

const END_POINT = "/orders";

const getByCustomer = (queryString) => httpClient.get(`${END_POINT}/for-customer`, {
    params: {
      orderList: queryString
    },
  });

const getAllOrders = (queryString) => httpClient.get(`${END_POINT}`, {
    params: {
      status: queryString.status,
      search: queryString.search,
      page: queryString.page,
      limit: queryString.limit,
      isActive: queryString.isActive
    },
  });
  
const getOrder = (id) => httpClient.get(`${END_POINT}/${id}`);
  
const getAllProductsForOrder = (id) => httpClient.get(`${END_POINT}/products/${id}`);

const createOrder = (order) => httpClient.post(END_POINT, order);

const createOrderList = (list) => httpClient.post(`${END_POINT}/products`, list);

const updateOrder = (id, order) => httpClient.put(`${END_POINT}/${id}`, order);

const paymentRequest = (id, order) => httpClient.put(`${END_POINT}/payment-request/${id}`, order);

const paymentTreatment = (id, order) => httpClient.put(`${END_POINT}/payment-treatment/${id}`, order);

const payment = (id, order) => httpClient.put(`${END_POINT}/payment/${id}`, order);

const deleteOrder = (id) => httpClient.delete(`${END_POINT}/${id}`);


export { getAllOrders, getOrder, getByCustomer, getAllProductsForOrder, createOrder, createOrderList, updateOrder, paymentRequest, paymentTreatment, payment, deleteOrder };