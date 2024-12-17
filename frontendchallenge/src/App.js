import React, { useEffect, useState } from "react";
import DataTable from "@backyard/react/DataTable";

interface ManageCostTableProps {
  fetchData: (page: number, pageSize: number, searchCriteria?: any) => Promise<any>;
  getColumns: (handleAction: (row: any) => void) => any[];
  searchCriteria?: any; // Optional search criteria
}

const ManageCostTable: React.FC<ManageCostTableProps> = ({
  fetchData,
  getColumns,
  searchCriteria,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20); // Fixed page size
  const [totalCount, setTotalCount] = useState(0);

  const handleActionClick = (row: any) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchData(page, pageSize, searchCriteria);
        setData(result.itemAttributesList || []);
        setTotalCount(result.pageResponse.totalCount);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchData, page, pageSize, searchCriteria]);

  const columns = getColumns(handleActionClick);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={data}
            pagination={{
              currentPage: page,
              pageSize: pageSize,
              total: totalCount,
              onPageChange: (newPage) => setPage(newPage),
            }}
          />
          {showModal && (
            <div>
              <p>Setup cost for: {selectedRow?.modelNumber}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageCostTable;





import React from "react";
import ManageCostTable from "./ManageCostTable";
import { getManageCostColumns } from "./ManageCostColumns";

const ManageCostSearch: React.FC<{ searchCriteria: any }> = ({ searchCriteria }) => {
  const fetchSearchData = async (page: number, pageSize: number, searchCriteria: any) => {
    const requestBody = {
      filters: {
        subStatus: ["PENDING_CORE_ASSET", "PENDING_COST_PRO_PROGRAM"],
      },
      pagination: { page, pageSize },
    };

    const response = await fetch("/api/manage-cost/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    return result;
  };

  return (
    <ManageCostTable
      fetchData={fetchSearchData}
      getColumns={getManageCostColumns}
      searchCriteria={searchCriteria}
    />
  );
};

export default ManageCostSearch;


import React from "react";
import ManageCostTable from "./ManageCostTable";
import { getManageCostColumns } from "./ManageCostColumns";

const ManageCostMaintenance: React.FC = () => {
  const fetchMaintenanceData = async (page: number, pageSize: number) => {
    const requestBody = {
      filters: {
        programTypeApprovals: {
          proSelling: ["INITIATED", "IN_PROGRESS", "COMPLETED"],
        },
      },
      pagination: { page, pageSize },
    };

    const response = await fetch("/api/manage-cost/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    return result;
  };

  return (
    <ManageCostTable fetchData={fetchMaintenanceData} getColumns={getManageCostColumns} />
  );
};

export default ManageCostMaintenance;
