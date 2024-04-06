import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/reports.css'; // Ensure the CSS file path is correct

function Reports() {
  const navigate = useNavigate();

  const goToReport = (reportPath) => {
    navigate(reportPath);
  };

  return (
    <div className='reports-page'>
      <div className="reports-header">
        <h1 className="reports-title">Admin Reports</h1>
      </div>
      <div className="report-buttons">
        <button onClick={() => goToReport('/employeesanddepartments')} className="report-link">Employees and Depratments</button>
        <button onClick={() => goToReport('/report2')} className="report-link">User Engagement</button>
        <button onClick={() => goToReport('/report3')} className="report-link">Inventory Status</button>
      </div>
      <p className="report-description">
      Select a report to view.
      </p>
    </div>
  );
};

export default Reports;
