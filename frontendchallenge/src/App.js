import axiosClient from './axiosClient'; // Assuming axiosClient is already set up
import { TIERED_COST_BASE_URL, TIMEOUT } from '../constants/APIConstants'; // Assuming constants are defined
import { transformToFilterObject } from './transformToFilterObject'; // Assuming transformToFilterObject is defined

export const getManageCostData = async (
  page: number,
  size: number,
  searchCriteriaDummy: any | null, // Input criteria to merge
  vendorNumber: number[] // Vendor numbers passed as a prop
): Promise<any> => {
  // Default filter values when searchCriteriaDummy is not passed
  const defaultFilters = {
    filters: {
      subStatus: ["PENDING_CORE_ASSET", "PENDING_CORE_PRO_PROGRAM"],
      programTypeApprovals: {
        proSelling: ["INITIATED", "IN_PROGRESS", "COMPLETED"],
      },
      vendorNumber: vendorNumber, // Passed dynamically
    },
    isCreateFlow: true, // Include only in Case 1
  };

  // If searchCriteriaDummy is passed, dynamically generate filterObject
  const filterObject = searchCriteriaDummy
    ? transformToFilterObject(searchCriteriaDummy)
    : null;

  // Determine the final structure for filters
  const filters = filterObject
    ? { filters: filterObject } // Do not include isCreateFlow for Case 2
    : defaultFilters; // Use defaults only when no searchCriteriaDummy

  // Construct requestBody
  const requestBody = {
    ...filters,
    pageInfo: {
      page,
      pageSize: size,
    },
  };

  console.log("Transformed Request Body:", requestBody);

  try {
    const response = await axiosClient.post(
      `${TIERED_COST_BASE_URL}/external/filter-items`,
      requestBody,
      {
        timeout: TIMEOUT,
        isPost: true,
        options: {
          validateStatus: (status) => status >= 200 && status < 300,
        },
      }
    );

    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.error("Error in getManageCostData:", error);
    throw error;
  }
};
