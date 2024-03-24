import React, { useState } from 'react';
import '../css/register.css';
import '../css/vehicles.css';


const VehiclesTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  // Function to toggle row expansion
  const toggleRowExpansion = (rowId) => {
    if (expandedRows.includes(rowId)) {
      // If row is already expanded, remove it from the expandedRows array
      setExpandedRows(expandedRows.filter(id => id !== rowId));
    } else {
      // If row is not expanded, add it to the expandedRows array
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  // Function to render additional information when a row is expanded
  const renderAdditionalInfo = (rowId) => {
    if (expandedRows.includes(rowId)) {
      return (
        <tr>
          <td colSpan="3">info {rowId}</td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div className="registration-container">
        <div className="vehicle-card">
    <table>
      <thead>
        <h1>Vehicle List</h1>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map(rowId => (
          <React.Fragment key={rowId}>
            <tr onClick={() => toggleRowExpansion(rowId)}>
              <td>{rowId}</td>
              <td>Vehicle {rowId}</td>
              <td>Details</td>
            </tr>
            {renderAdditionalInfo(rowId)}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
};

export default VehiclesTable;