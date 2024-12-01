import React from 'react';
import Button from '@backyard/react/Button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@backyard/react/Table';
import { WrapperComponent } from './ManageCost.styles';

const ManageCost: React.FC = ({ onClickHandler }) => {
  return (
    <WrapperComponent>
      {/* Tab structure */}
      <div data-testid="tab-structure">
        <h2>Manage Cost</h2>
        <p>Displaying 0 of 0 items</p>
      </div>

      {/* Action buttons */}
      <div className="action-buttons" style={{ textAlign: 'right', marginBottom: '16px' }}>
        <Button
          variant="secondary"
          startIcon={<i className="icon-download" />}
          data-testid="download-items-button"
        >
          Download Items
        </Button>
        <Button
          variant="secondary"
          startIcon={<i className="icon-upload" />}
          data-testid="upload-cost-button"
          style={{ marginLeft: '8px' }}
        >
          Upload Cost Details
        </Button>
      </div>

      {/* Data Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell as="th" scope="col">Checkbox</TableCell>
            <TableCell as="th" scope="col">PCID</TableCell>
            <TableCell as="th" scope="col">Model #</TableCell>
            <TableCell as="th" scope="col">Tiered Cost</TableCell>
            <TableCell as="th" scope="col">Setup Cost</TableCell>
            <TableCell as="th" scope="col">Item Image</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Placeholder row */}
          <TableRow>
            <TableCell>
              <input type="checkbox" disabled />
            </TableCell>
            <TableCell>--</TableCell>
            <TableCell>--</TableCell>
            <TableCell>--</TableCell>
            <TableCell>
              <Button
                variant="tertiary"
                size="small"
                style={{ textDecoration: 'underline' }}
              >
                Edit Cost
              </Button>
            </TableCell>
            <TableCell>
              <img
                src="https://via.placeholder.com/50"
                alt="Item"
                style={{ width: '50px', height: '50px' }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </WrapperComponent>
  );
};

export { ManageCost };
export default ManageCost;,
