const FABRIC = process.env.REACT_APP_FABRIC_NAME;

async function invokeFunction(functionName, params, baseUrl, token) {
    const queryData = await GetQueryWorkerData(
        functionName,
        params,
        baseUrl,
        token,
    );
    let data;
    if (queryData.result.length === 1) {
        data = queryData.result[0];
    } else {
        data = queryData.result;
    }

    return data;
}

async function GetQueryWorkerData(functionName, params, baseUrl, token) {
    const response = await fetch(
        `${baseUrl}/_fabric/${FABRIC}/_api/restql/execute/${functionName}`,
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

async function addProductData(collectionName, params, baseUrl, token) {
    const response = await fetch(
        `${baseUrl}/_fabric/${FABRIC}/_api/document/${collectionName}`,
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

async function updateProductData(collectionName, params, key, baseUrl, token) {
    const response = await fetch(
        `${baseUrl}/_fabric/${FABRIC}/_api/document/${collectionName}/${key}`,
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

async function deleteProductData(collectionName, key, baseUrl, token) {
    const response = await fetch(
        `${baseUrl}/_fabric/${FABRIC}/_api/document/${collectionName}/${key}`,
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

export async function getSuppliers({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-suppliers", params, baseUrl, token);
}

export async function getSupplierById(id, baseUrl, token) {
    return await invokeFunction(
        "get-supplier-info",
        { key: id },
        baseUrl,
        token,
    );
}

export async function getAllSuppliers(baseUrl, token) {
    return await invokeFunction("get-all-suppliers", "", baseUrl, token);
}

export async function getAllCategories(baseUrl, token) {
    return await invokeFunction("get-all-categories", "", baseUrl, token);
}

export async function getProducts({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-products", params, baseUrl, token);
}

export async function getProductById(id, baseUrl, token) {
    return await invokeFunction(
        "get-product-info",
        { key: id },
        baseUrl,
        token,
    );
}

export async function addProduct(data, baseUrl, token) {
    return await addProductData("products", data, baseUrl, token);
}

export async function updateProduct(data, key, baseUrl, token) {
    return await updateProductData("products", data, key, baseUrl, token);
}

export async function deleteProduct(key, baseUrl, token) {
    return await deleteProductData("products", key, baseUrl, token);
}

export async function getOrders({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-orders", params, baseUrl, token);
}

export async function getOrderById(id, baseUrl, token) {
    return await invokeFunction("get-order-info", { key: id }, baseUrl, token);
}

export async function getCustomers({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-customers", params, baseUrl, token);
}

export async function getCustomerById(id, baseUrl, token) {
    return await invokeFunction(
        "get-customer-info",
        { key: id },
        baseUrl,
        token,
    );
}

export async function getEmployees({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-employees", params, baseUrl, token);
}

export async function getEmployeeById(id, baseUrl, token) {
    return await invokeFunction(
        "get-employee-info",
        { key: id },
        baseUrl,
        token,
    );
}

export async function runSearch(functionName, params, baseUrl, token) {
    const data = await GetQueryWorkerData(functionName, params, baseUrl, token);
    return data.result;
}

export async function GetDocumentData(collection, key, baseUrl, token) {
    const response = await fetch(
        `${baseUrl}/_fabric/${FABRIC}/_api/document/${collection}/${key}`,
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

export async function GetJwtToken(params, baseUrl) {
    const response = await fetch(`${baseUrl}/_open/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    return await response.json();
}

export async function getRegions(tenant, baseUrl, token) {
    const response = await fetch(`${baseUrl}/datacenter/_tenant/${tenant}`, {
        method: "GET",
        headers: {
            Authorization: `bearer ${token}`,
            accept: "application/json",
        },
    });
    return await response.json();
}
