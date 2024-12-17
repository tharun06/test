import React from "react";
import { DataTable } from "@backyard/react";
import { getManageCostColumns } from "./ManageCostColumns";
import usePaginationData from "./usePaginationData";

const ManageCost: React.FC = () => {
  const { data, pagination, loading, setPage, setPageSize } =
    usePaginationData("/api/your-endpoint");

  const columns = getManageCostColumns();

  return (
    <WrapperComponent>
      <DataTable
        columns={columns}
        data={data}
        pageIndex={pagination.page - 1} // DataTable expects 0-based index
        pageSize={pagination.pageSize}
        onPageChange={(pageIndex) => setPage(pageIndex + 1)}
        onPageSizeChange={setPageSize}
        headerStyle={{ colors: "subdued" }}
        sizes="large"
      />

      {loading && <p>Loading...</p>}

      <Typography>
        {`Displaying ${data.length} of ${pagination.totalCount} items`}
      </Typography>
    </WrapperComponent>
  );
};

export default ManageCost;
import { useState, useEffect } from "react";

interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const usePaginationData = (endpoint: string) => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${endpoint}?page=${page}&pageSize=${pageSize}`
      );
      const result = await response.json();

      setData(result.data || []);
      setPagination({
        page: result.pagination.page,
        pageSize: result.pagination.pageSize,
        totalCount: result.pagination.totalCount,
        totalPages: result.pagination.totalPages,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.page, pagination.pageSize);
  }, [pagination.page, pagination.pageSize]);

  const setPage = (newPage: number) =>
    setPagination((prev) => ({ ...prev, page: newPage }));

  const setPageSize = (newPageSize: number) =>
    setPagination((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));

  return { data, pagination, loading, setPage, setPageSize };
};

export default usePaginationData;


import React from "react";
import { Typography, Button } from "@some-ui-library";
import { CheckCircleFilled } from "@some-icon-library";

export const getManageCostColumns = () => [
  {
    Header: "Model Number",
    accessor: "modelNumber",
    maxWidth: 500,
    Cell: ({ row }: { row: any }) => (
      <div key={row.original.modeNumber}>
        <img src={row.original.itemImage} alt="Item" />
        <div className="model-number-container">
          <p className="model-number">{row.original.modeNumber}</p>
          <Typography
            variant="label"
            className="equivalent-number"
          >
            {row.original.equivalentNumber}
          </Typography>
        </div>
      </div>
    ),
  },
  {
    Header: "Item Description",
    accessor: "itemDescription",
    Cell: ({ value }: { value: string }) => (
      <Typography size="size_12">{value}</Typography>
    ),
  },
  {
    Header: "Tiered Cost",
    accessor: "tieredCost",
    Cell: ({ value, row }: { value: string; row: any }) => (
      <div className="tiered-cost-cell">
        {value === "Done" && (
          <>
            <CheckCircleFilled
              color="icon_green"
              style={{ marginRight: "8px" }}
              size="size_12"
            />
            <Typography>Done</Typography>
          </>
        )}
        <Button variant="ghost" className="tiered-cost-link">
          Edit Cost
        </Button>
      </div>
    ),
  },
];



