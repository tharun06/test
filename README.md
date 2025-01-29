import React from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@backyard/icons';
import Button from '@backyard/react/Button';
import { Option, Select, Typography } from '@backyard/react';
import type { ManageCostProps } from '../typings/ManageCostProps';
import { ModeNumberCell, TieredCostStatus } from './ManageCost.styles';

const getButtonLabel = (costUpdateStatus: string, pcKey: string, editedRows: Set<string>) => {
    if (costUpdateStatus === 'DONE' || editedRows.has(pcKey)) return 'Edit Cost';
    if (costUpdateStatus === 'FAILED') return 'Fix Cost Errors';
    return 'Setup Cost';
};

export const getManageCostColumns = ({
    handleSetupCostClick,
    searchCriteria,
    isMerchant,
    editedRows
}: {
    handleSetupCostClick: (row: any) => void;
    searchCriteria: Record<string, any>;
    isMerchant: boolean;
    editedRows: Set<string>;
}) => [
    {
        Header: searchCriteria ? 'Model Number' : 'Item Number',
        accessor: 'modeNumber',
        enableSortBy: false,
        enableFiltering: false,
        Cell: ({ row }: { row: { original: ManageCostProps['data'][number] } }) => (
            <ModeNumberCell key={row.original.modeNumber}>
                <img src={row.original.itemImage} alt="Item" />
                <div className="model-number-container">
                    {searchCriteria && <p className="mode-number">{row.original.lin}</p>}
                    <p className="mode-number">{row.original.modeNumber}</p>
                </div>
            </ModeNumberCell>
        )
    },
    {
        Header: 'Item Description',
        accessor: 'itemDescription',
        Filters: () => null,
        Cell: ({ value }: { value: string }) => <Typography size="size_12">{value}</Typography>
    },
    {
        Header: 'Tiered Cost',
        accessor: 'costUpdateStatus',
        enableSortBy: true,
        enableFilters: true,
        Filter: ({ column }: { column: { setFilter: (value: string) => void } }) => (
            <Select onChange={(e) => column.setFilter(e.target.value)} value="" size="small" style={{ padding: '16px 0' }}>
                <Option value="">All</Option>
                <Option value="PENDING">Items needing cost</Option>
                <Option value="DONE">Items with costs</Option>
                <Option value="FAILED">Items with cost errors</Option>
            </Select>
        ),
        Cell: ({ row }: { row: { original: ManageCostProps['data'][number] } }) => {
            const { costUpdateStatus, modeNumber, pcKey } = row.original;

            const statusComponents = {
                DONE: (
                    <TieredCostStatus>
                        <CheckCircleFilled color="icon_green" style={{ marginRight: '8px' }} size="size_12" />
                        <Typography>Done</Typography>
                    </TieredCostStatus>
                ),
                PENDING: (
                    <TieredCostStatus>
                        <CloseCircleFilled color="icon_red" style={{ marginRight: '8px' }} size="size_12" />
                        <Typography>Setup Cost</Typography>
                    </TieredCostStatus>
                ),
                FAILED: (
                    <TieredCostStatus>
                        <CloseCircleFilled color="icon_amber" style={{ marginRight: '8px' }} size="size_12" />
                        <Typography>Fix Cost Errors</Typography>
                    </TieredCostStatus>
                )
            };

            return (
                <div className="tiered-cost-cell" key={`cost-${modeNumber}`}>
                    {statusComponents[costUpdateStatus] || statusComponents.PENDING}
                    {isMerchant ? (
                        <Button variant="ghost" className="tiered-cost-link">
                            View
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            className="tiered-cost-link"
                            onClick={() => handleSetupCostClick(row.original)}
                        >
                            {getButtonLabel(costUpdateStatus, pcKey, editedRows)}
                        </Button>
                    )}
                </div>
            );
        }
    }
];
