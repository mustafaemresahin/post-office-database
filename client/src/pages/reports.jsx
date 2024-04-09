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
        <button onClick={() => goToReport('/vehiclesandemployees')} className="report-link">Vehicles and Employees</button>
        <button onClick={() => goToReport('/packagesender')} className="report-link">Package Sender Report</button>
        <button onClick={() => goToReport('/totalamountuser')} className="report-link">Report on total amount user spent </button>
        <button onClick={() => goToReport('/packagereport')} className="report-link">Report on packages </button>

      </div>
      <p className="report-description">
      Select a report to view.
      </p>
    </div>
  );
};

export default Reports;
