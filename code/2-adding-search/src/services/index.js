const FABRIC = process.env.REACT_APP_FABRIC_NAME;

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

export async function runSearch(functionName, params, baseUrl, token) {
    const data = await getQueryWorkerData(functionName, params, baseUrl, token);
    return data.result;
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
