const BASE_URL = process.env.REACT_APP_BASE_URL;
const FABRIC = process.env.REACT_APP_FABRIC_NAME;
const API_KEY = process.env.REACT_APP_API_KEY;

export async function getSuppliers({ page, pageSize }) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-suppliers", params);
}

export async function getAllSuppliers() {
    return await invokeFunction("get-all-suppliers", "");
}

export async function getAllCategories() {
    return await invokeFunction("get-all-categories", "");
}

export async function getSupplierById(id) {
    return await invokeFunction("get-supplier-info", { key: id });
}

export async function getProducts({ page, pageSize }) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-products", params);
}

export async function getProductById(id) {
    return await invokeFunction("get-product-info", { key: id });
}

export async function addProduct(data) {
    return await addProductData("products", data);
}

export async function updateProduct(data, key) {
    return await updateProductData("products", data, key);
}

export async function deleteProduct(key) {
    return await deleteProductData("products", key);
}

export async function getOrders({ page, pageSize }) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-orders", params);
}

export async function getOrderById(id) {
    return await invokeFunction("get-order-info", { key: id });
}

export async function getCustomers({ page, pageSize }) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-customers", params);
}

export async function getCustomerById(id) {
    return await invokeFunction("get-customer-info", { key: id });
}

export async function getEmployees({ page, pageSize }) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-employees", params);
}

export async function getEmployeeById(id) {
    return await invokeFunction("get-employee-info", { key: id });
}

export async function runSearch(functionName, params) {
    const data = await GetQueryWorkerData(functionName, params);
    return data.result;
}

export async function GetDocumentData(collection, key) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collection}/${key}`,
        {
            method: "GET",
            headers: {
                Authorization: `apiKey ${API_KEY}`,
                accept: "application/json",
            },
        },
    );
    return await response.json();
}

async function invokeFunction(functionName, params) {
    const queryData = await GetQueryWorkerData(functionName, params);
    let data;
    if (queryData.result.length === 1) {
        data = queryData.result[0];
    } else {
        data = queryData.result;
    }

    return data;
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
            body:
                params !== ""
                    ? JSON.stringify({ bindVars: params })
                    : JSON.stringify({}),
        },
    );
    return await response.json();
}

async function addProductData(collectionName, params) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collectionName}`,
        {
            method: "POST",
            headers: {
                Authorization: `apiKey ${API_KEY}`,
                accept: "application/json",
            },
            body: JSON.stringify(params),
        },
    );
    return await response.json();
}

async function updateProductData(collectionName, params, key) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collectionName}/${key}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `apiKey ${API_KEY}`,
                accept: "application/json",
            },
            body: JSON.stringify(params),
        },
    );
    return await response.json();
}

async function deleteProductData(collectionName, key) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collectionName}/${key}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `apiKey ${API_KEY}`,
                accept: "application/json",
            },
            body: "",
        },
    );
    return await response.json();
}
