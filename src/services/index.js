const BASE_URL =
  process.env.REACT_APP_BASE_URL;
const FABRIC = process.env.REACT_APP_FABRIC_NAME;
const API_KEY = process.env.REACT_APP_API_KEY;

export async function getSuppliers({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  return await invokeFunction("get-suppliers", params);
}

export async function getSupplierById(id) {
  return await invokeFunction("get-supplier-info", {key: id});
}

export async function getProducts({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  return await invokeFunction("get-products", params);
}

export async function getProductById(id) {
  return await invokeFunction("get-product-info", {key: id});
}

export async function getOrders({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  return await invokeFunction("get-orders", params);
}

export async function getOrderById(id) {
  return await invokeFunction("get-order-info", {key: id});
}

export async function getCustomers({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  return await invokeFunction("get-customers", params);
}

export async function getCustomerById(id) {
  return await invokeFunction("get-customer-info", {key: id});
}

export async function getEmployees({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  return await invokeFunction("get-employees", params);
}

export async function getEmployeeById(id) {
  return await invokeFunction("get-employee-info", {key: id});
}

export async function runSearch(functionName, params) {
  const data = await GetQueryWorkerData(functionName, params);
  return data.result;
}

async function invokeFunction(functionName, params) {
  const data = await GetQueryWorkerData(functionName, params);
  return data.result[0];
}

async function GetQueryWorkerData(functionName, params) {
  const response = await fetch(
      `${BASE_URL}/_fabric/${FABRIC}/_api/restql/execute/${functionName}`,
      {
        method: "POST",
        headers: {
          Authorization: `apiKey ${API_KEY}`,
          accept: "application/json",
        },
        body: JSON.stringify({bindVars: params})
      }
  );
  return await response.json();
}
