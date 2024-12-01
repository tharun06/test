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

const dummyData = [
  {
    modelNumber: "BFFDF21321",
    description: "Motor Grass Cutter",
    tieredCost: "Done",
    setupCost: "Edit Cost",
    imageUrl: "https://via.placeholder.com/50", // Placeholder image
    status: "green", // For conditional styling
  },
];

const ManageCost: React.FC = () => {
  return (
    <WrapperComponent>
      {/* Tab structure */}
      <div data-testid="tab-structure">
        <h2>Manage Cost</h2>
        <p>Displaying 1 of 1 items</p>
      </div>

      {/* Action buttons */}
      <div className="action-buttons" style={{ textAlign: 'right' }}>
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
            <TableCell as="th" scope="col">Model Number</TableCell>
            <TableCell as="th" scope="col">Item Description</TableCell>
            <TableCell as="th" scope="col">Tiered Cost</TableCell>
            <TableCell as="th" scope="col">Setup Cost</TableCell>
            <TableCell as="th" scope="col">Item Image</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(10).fill(dummyData[0]).map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{item.modelNumber}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <span style={{ color: item.status }}>{item.tieredCost}</span>
              </TableCell>
              <TableCell>
                <Button
                  variant="tertiary"
                  size="small"
                  style={{ textDecoration: "underline" }}
                >
                  {item.setupCost}
                </Button>
              </TableCell>
              <TableCell>
                <img
                  src={item.imageUrl}
                  alt="Item"
                  style={{ width: "50px", height: "50px" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </WrapperComponent>
  );
};

export default ManageCost;
