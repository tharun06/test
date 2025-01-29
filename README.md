{
  Header: 'Tiered Cost',
  accessor: 'costUpdateStatus',
  enableSortBy: true,
  enableFilters: true,
  Filter: ({ column }) => {
    const isISM = !searchCriteria || Object.keys(searchCriteria).length === 0; // Determine if ISM based on searchCriteria

    const options = isISM
      ? [
          { value: '', label: 'All' },
          { value: 'FAILED', label: 'Items with cost errors' },
        ]
      : [
          { value: '', label: 'All' },
          { value: 'PENDING', label: 'Items needing cost' },
          { value: 'DONE', label: 'Items with costs' },
          { value: 'FAILED', label: 'Items with cost errors' },
        ];

    return (
      <Select
        onChange={(e) => column.setFilter(e.target.value)}
        value={column.filterValue ?? ""}
        size="small"
        style={{ paddingTop: '16px', paddingBottom: '16px' }} // Adding padding as requested
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    );
  },
}
