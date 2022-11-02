const baseUrl = process.env.REACT_APP_GDN_API_URL;
const fabric = process.env.REACT_APP_FABRIC_NAME;
const apiKey = process.env.REACT_APP_API_KEY;

// Hard-coded dummy data
const suppliers = [
  {
    id: 1,
    name: "Charlotte Cooper",
    title: "Purchasing Manager",
    companyName: "Exotic Liquids",
    address: "49 Gilbert St.",
    city: "London",
    region: "British Isles",
    country: "UK",
    postalCode: "EC1 4SD",
    phone: "(171) 555-2222",
  },
  {
    id: 5,
    name: "Antonio del Valle Saavedra",
    title: "Export Administrator",
    companyName: "Cooperativa de Quesos 'Las Cabras'",
    address: "Calle del Rosal 4",
    city: "Oviedo",
    region: "Southern Europe",
    country: "Spain",
    postalCode: "33007",
    phone: "(98) 598 76 54",
  },
];

const products = [
  {
    id: 1,
    name: "Chai",
    quantityPerUnit: "10 boxes x 20 bags",
    unitPrice: 18,
    unitsInStock: 39,
    unitsInOrder: 0,
    reorderLevel: 10,
    discontinued: 0,
    supplier: {
      id: 1,
      name: "Exotic Liquids",
    },
  },
  {
    id: 3,
    name: "Aniseed Syrup",
    quantityPerUnit: "12 - 550 ml bottles",
    unitPrice: 10,
    unitsInStock: 13,
    unitsInOrder: 70,
    reorderLevel: 25,
    discontinued: 0,
    supplier: {
      id: 1,
      name: "Exotic Liquids",
    },
  },
  {
    id: 11,
    name: "Queso Cabrales",
    quantityPerUnit: "1 kg pkg.",
    unitPrice: 21,
    unitsInStock: 22,
    unitsInOrder: 30,
    reorderLevel: 30,
    discontinued: 0,
    supplier: {
      id: 5,
      name: "Cooperativa de Quesos 'Las Cabras'",
    },
  },
];

const customers = [
  {
    id: 1,
    name: "Maria Anders",
    title: "Sales Representative",
    companyName: "Alfreds Futterkiste",
    address: "Obere Str. 57",
    city: "Berlin",
    region: "Western Europe",
    country: "Germany",
    postalCode: "12209",
    phone: "30-0074321",
    fax: "030-0076545",
  },
  {
    id: 2,
    name: "Antonio Moreno",
    title: "Owner",
    companyName: "Antonio Moreno Taquería",
    address: "Mataderos 2312",
    city: "México D.F.",
    region: "Central America",
    country: "Mexico",
    postalCode: "05023",
    phone: "(5) 555-3932",
  },
];

const orders = [
  {
    id: 10100,
    customer: {
      id: 1,
      companyName: "Alfreds Futterkiste",
    },
    products: {
      list: [
        {
          id: 1,
          name: "Chai",
          quantity: 20,
          price: 18,
          totalPrice: 342,
          discount: 0.05,
        },
        {
          id: 3,
          name: "Aniseed Syrup",
          quantity: 30,
          price: 10,
          totalPrice: 300,
          discount: 0,
        },
      ],
      differentProductCount: 2,
      totalQuantity: 50,
      totalDiscount: 18,
      totalPrice: 642.0,
    },
    shipping: {
      shippedDate: "2022-10-05",
      requiredDate: "2022-10-08",
      via: "Speedy Express",
      freight: "20.42",
      address: "Obere Str. 57",
      city: "Berlin",
      region: "Western Europe",
      country: "Germany",
      postalCode: "12209",
    },
    createdAt: "2022-09-20",
  },
  {
    id: 20000,
    customer: {
      id: 2,
      companyName: "Antonio Moreno Taquería",
    },
    products: {
      list: [
        {
          id: 11,
          name: "Queso Cabrales",
          quantity: 15,
          price: 21,
          totalPrice: 299.25,
          discount: 0.05,
        },
      ],
      differentProductCount: 1,
      totalQuantity: 15,
      totalDiscount: 15.75,
      totalPrice: 299.25,
    },
    shipping: {
      shippedDate: "2022-09-21",
      requiredDate: "2022-09-30",
      via: "Speedy Express",
      freight: "20.42",
      address: "Mataderos 2312",
      city: "México D.F.",
      region: "Central America",
      country: "Mexico",
      postalCode: "05023",
    },
    createdAt: "2022-10-02",
  },
];

const employees = [
  {
    _key: 1,
    FirstName: "Andrew",
    Title: "Vice President, Sales",
    TitleOfCourtesy: "Dr.",
    BirthDate: "1984-02-19",
    HomePhone: "(206) 555-9482",
    HireDate: "2020-08-04",
    Extension: "3457",
    Notes:
      "Andrew received his BTS commercial in 1974 and a Ph.D. in international marketing from the University of Dallas in 1981.",
    Address: "908 W. Capital Way",
    City: "Tacoma",
    Country: "USA",
    PostalCode: "98401",
  },
  {
    _key: 2,
    FirstName: "Nancy",
    Title: "Sales Representative",
    TitleOfCourtesy: "Ms.",
    BirthDate: "1980-12-08",
    HomePhone: "(206) 555-9857",
    HireDate: "2020-05-01",
    Extension: "5467",
    Notes:
      "Education includes a BA in psychology from Colorado State University in 1970.",
    Address: "507 - 20th Ave. E. Apt. 2A",
    City: "Seattle",
    Country: "USA",
    PostalCode: "98122",
    // reportsTo: {
    //   id: 1,
    //   name: "Andrew Fuller",
    // },
  },
];

export async function getSuppliers() {
  return Promise.resolve(suppliers);
}

export async function getSupplierById(id) {
  for (let i = 0; i < suppliers.length; i++) {
    const supplier = suppliers[i];

    if (supplier.id === id) {
      return Promise.resolve(supplier);
    }
  }

  return Promise.resolve({});
}

export async function getProducts() {
  return Promise.resolve(products);
}

export async function getProductById(id) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (product.id === id) {
      return Promise.resolve(product);
    }
  }

  return Promise.resolve({});
}

export async function getOrders() {
  return Promise.resolve(orders);
}

export async function getOrderById(id) {
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    if (order.id === id) {
      return Promise.resolve(order);
    }
  }

  return Promise.resolve({});
}

export async function getCustomers() {
  return Promise.resolve(customers);
}

export async function getCustomerById(id) {
  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];

    if (customer.id === id) {
      return Promise.resolve(customer);
    }
  }

  return Promise.resolve({});
}

export async function getEmployees({ page, pageSize }) {
  const functionName = "get-employees";

  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  const encondedParams = encodeURIComponent(JSON.stringify(params).trim());

  const response = await fetch(
    `${baseUrl}/_fabric/${fabric}/_api/function/invoke/${functionName}?params=${encondedParams}`,
    {
      method: "POST",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        accept: "application/json",
      },
      body: "",
    }
  );

  const employees = await response.json();

  // Additional temporary call to get document count.
  const collectionName = "employees";
  const total = await getDocumentCount(collectionName);

  return {
    total,
    data: employees,
  };
}

export async function getEmployeeById(id) {
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];

    if (employee._key === 1) {
      return Promise.resolve(employee);
    }
  }

  return Promise.resolve({});
}

async function getDocumentCount(collectionName) {
  const response = await fetch(
    `${baseUrl}/_fabric/${fabric}/_api/collection/${collectionName}/count`,
    {
      headers: {
        Authorization: `apiKey ${apiKey}`,
        accept: "application/json",
      },
    }
  );

  const { count } = await response.json();
  return count;
}
