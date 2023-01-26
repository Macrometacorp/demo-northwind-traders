const BASE_URL = process.env.REACT_APP_BASE_URL;
const FABRIC = process.env.REACT_APP_FABRIC_NAME;

export async function getSuppliers({ page, pageSize }, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-suppliers", params, token);
}

export async function getAllSuppliers(token) {
    return await invokeFunction("get-all-suppliers", "", token);
}

export async function getAllCategories(token) {
    return await invokeFunction("get-all-categories", "", token);
}

export async function getSupplierById(id, token) {
    return await invokeFunction("get-supplier-info", { key: id }, token);
}

export async function getProducts({ page, pageSize }, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-products", params, token);
}

export async function getProductById(id, token) {
    return await invokeFunction("get-product-info", { key: id }, token);
}

export async function addProduct(data, token) {
    return await addProductData("products", data, token);
}

export async function updateProduct(data, key, token) {
    return await updateProductData("products", data, key, token);
}

export async function deleteProduct(key, token) {
    return await deleteProductData("products", key, token);
}

export async function getOrders({ page, pageSize }, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-orders", params, token);
}

export async function getOrderById(id, token) {
    return await invokeFunction("get-order-info", { key: id }, token);
}

export async function getCustomers({ page, pageSize }, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-customers", params, token);
}

export async function getCustomerById(id, token) {
    return await invokeFunction("get-customer-info", { key: id }, token);
}

export async function getEmployees({ page, pageSize }, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-employees", params, token);
}

export async function getEmployeeById(id, token) {
    return await invokeFunction("get-employee-info", { key: id }, token);
}

export async function runSearch(functionName, params, token) {
    const data = await GetQueryWorkerData(functionName, params, token);
    return data.result;
}

export async function GetDocumentData(collection, key, token) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collection}/${key}`,
        {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
                accept: "application/json",
            },
        },
    );
    return await response.json();
}

export async function GetJwtToken(params) {
    const response = await fetch(`${BASE_URL}/_open/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    return await response.json();
}

async function invokeFunction(functionName, params, token) {
    const queryData = await GetQueryWorkerData(functionName, params, token);
    let data;
    if (queryData.result.length === 1) {
        data = queryData.result[0];
    } else {
        data = queryData.result;
    }

    return data;
}

async function GetQueryWorkerData(functionName, params, token) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/restql/execute/${functionName}`,
        {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
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

async function addProductData(collectionName, params, token) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collectionName}`,
        {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
                accept: "application/json",
            },
            body: JSON.stringify(params),
        },
    );
    return await response.json();
}

async function updateProductData(collectionName, params, key, token) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collectionName}/${key}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`,
                accept: "application/json",
            },
            body: JSON.stringify(params),
        },
    );
    return await response.json();
}

async function deleteProductData(collectionName, key, token) {
    const response = await fetch(
        `${BASE_URL}/_fabric/${FABRIC}/_api/document/${collectionName}/${key}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `bearer ${token}`,
                accept: "application/json",
            },
            body: "",
        },
    );
    return await response.json();
}
