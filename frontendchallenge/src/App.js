const searchCriteriaDummy = {
  searchMode: "LIN",
  searchValue: "4976530\n5143506\n4815573",
  online: true,
  store: true,
  eligibility: [
    { value: "ELIGIBLE", name: "Eligible" },
  ],
  selectedCountry: "USA",
  vendors: [
    { id: "131684", name: "Company" },
  ],
  brands: [
    { id: 12135, name: "Massimo" },
  ],
  subDivisions: [
    { id: "146", name: "146-RIDERS, POWERSPORTS, & CHORE" },
  ],
  itemBehavior: [
    { id: "Regular", name: "Regular" },
    { id: "Consignment", name: "Consignment" },
    { id: "Seasonal", name: "Seasonal" },
  ],
  itemStatus: "digitalAssets",
  category: {
    id: 7918,
    name: "UTVs & Golf Carts",
  },
  dqErrorStatus: "",
};

// Transform the object
const transformToFilterObject = (data) => {
  return {
    vendorNumber: data.vendors.map((vendor) => parseInt(vendor.id, 10)),
    modelNum: [], // Add logic if needed
    itemNum: [], // Add logic if needed
    subStatus: [], // Add logic if needed
    programTypeApprovals: null, // Add logic if needed
    programType: [], // Add logic if needed
    brandName: data.brands.map((brand) => brand.name),
    eligibility: data.eligibility.map((e) => e.value),
    itemBehavior: data.itemBehavior.map((behavior) => behavior.name),
    sellingChannel: [
      ...(data.online ? ["Online"] : []),
      ...(data.store ? ["Store"] : []),
    ],
    subDivisionNumber: data.subDivisions.map((sub) => sub.name),
    barcode: [], // Add logic if needed
    categoryId: data.category.id,
    isCreateFlow: true, // or false, based on your logic
  };
};

// Convert the object
const filterObject = transformToFilterObject(searchCriteriaDummy);

// Log the transformed object
console.log("Transformed Filter Object:", filterObject);

// Send to backend
const sendToBackend = async (data) => {
  try {
    const response = await fetch("https://backend.example.com/api/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Response from Backend:", responseData);
    } else {
      console.error("Error from Backend:", response.status);
    }
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

// Send the request
sendToBackend(filterObject);
