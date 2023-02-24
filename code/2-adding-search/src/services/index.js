const FABRIC = process.env.REACT_APP_FABRIC_NAME;

// This is the only method/API call that we need to have to connect to the
// backend of the application. (Macrometa platform)
// Method calls specific Query Worker by Query Worker name.
// Some of our Query Workers need to receive additional
// parameters (bind variables) to add/get/update/delete specific data
async function getQueryWorkerData(queryWorkerName, params, baseUrl, token) {
    const response = await fetch(
        `${baseUrl}/_fabric/${FABRIC}/_api/restql/execute/${queryWorkerName}`,
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
async function invokeFunction(queryWorkerName, params, baseUrl, token) {
    const queryData = await getQueryWorkerData(
        queryWorkerName,
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

// Calling Query Worker to add product data to products collection
export async function addProductData(params, baseUrl, token) {
    return await invokeFunction("add-product", params, baseUrl, token)
}

// Calling Query Worker to get product data from products collection
export async function getProductData(params, baseUrl, token) {
    return await invokeFunction("get-product", params, baseUrl, token);
}

// Calling Query Worker to update product data from products collection
export async function updateProductData(params, baseUrl, token) {
    return await invokeFunction("update-product", params, baseUrl, token)
}

// Calling Query Worker to delete product data from products collection
export async function deleteProductData(params, baseUrl, token) {
    return await invokeFunction("delete-product", params, baseUrl, token)
}

// Calling Query Worker to get all suppliers data from suppliers collection
export async function getAllSuppliers(baseUrl, token) {
    return await invokeFunction("get-all-suppliers", "", baseUrl, token);
}

// Calling Query Worker to get all categories data from categories collection
export async function getAllCategories(baseUrl, token) {
    return await invokeFunction("get-all-categories", "", baseUrl, token);
}

// Calling Query Worker to get list of product data from products collection
// We have offset and limit variables to enable paging on our application
export async function getProducts({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-products", params, baseUrl, token);
}

// Calling Query Worker to get specific product by ID (_key)
export async function getProductById(id, baseUrl, token) {
    return await invokeFunction(
        "get-product-info",
        { key: id },
        baseUrl,
        token,
    );
}

// Calling Query Worker to get list of suppliers data from suppliers collection
// We have offset and limit variables to enable paging on our application
export async function getSuppliers({ page, pageSize }, baseUrl, token) {
    const params = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
    };

    return await invokeFunction("get-suppliers", params, baseUrl, token);
}

// Calling Query Worker to get specific supplier by ID (_key)
export async function getSupplierById(id, baseUrl, token) {
    return await invokeFunction(
        "get-supplier-info",
        { key: id },
        baseUrl,
        token,
    );
}

// This method is used to call Query Worker that will perform search
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
