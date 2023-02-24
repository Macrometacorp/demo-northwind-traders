const FABRIC = process.env.REACT_APP_FABRIC_NAME;

// This is the only method/API call that we need to have to connect to the
// backend of the application. (Macrometa platform)
// Method calls specific Query Worker by Query Worker name.
// Some of our Query Workers need to receive additional
// parameters (bind variables) to add/get/update/delete specific data
async function getQueryWorkerData(functionName, params, baseUrl, token) {
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

// This method is used to parse different results that we get from Query
// Workers. Sometimes we have list of results in other cases we have
// just one result. It depends on how query of Query Workers is written
// It is possible to change Query Worker response in the Macrometa console
async function invokeFunction(functionName, params, baseUrl, token) {
    const queryData = await getQueryWorkerData(
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

export async function addProductData(params, baseUrl, token) {
    return await invokeFunction("add-product", params, baseUrl, token)
}

export async function getProductData(params, baseUrl, token) {
    return await invokeFunction("get-product", params, baseUrl, token);
}

export async function updateProductData(params, baseUrl, token) {
    return await invokeFunction("update-product", params, baseUrl, token)
}

export async function deleteProductData(params, baseUrl, token) {
    return await invokeFunction("delete-product", params, baseUrl, token)
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

export async function getOrders({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-orders", params, baseUrl, token);
}

export async function getOrderById(id, baseUrl, token) {
    return await invokeFunction(
        "get-order-info",
        { key: id },
        baseUrl,
        token);
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
    const data = await getQueryWorkerData(functionName, params, baseUrl, token);
    return data.result;
}

// This method is used for authentication with Macrometa platform
// We are using JWT token for all of our Query worker API requests
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

// This method allows us to switch from global URL to specific region on the
// platform. By default, we are using GLOBAL url so any of the application
// users will be automatically connected to the closest region
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
