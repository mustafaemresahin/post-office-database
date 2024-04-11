import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/reports.css';

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
        <button onClick={() => goToReport('/salesreport')} className="report-link">Sales Report</button>
        <button onClick={() => goToReport('/packageReport2')} className="report-link">Package Report</button>
        <button onClick={() => goToReport('/monthlysignups')} className="report-link">User Sign-Up Report</button>
        <button onClick={() => goToReport('/employeesanddepartments')} className="report-link2">Employees and Depratments</button>
        <button onClick={() => goToReport('/vehiclesandemployees')} className="report-link2">Vehicles and Employees</button>
        <button onClick={() => goToReport('/packagesender')} className="report-link2">Package Sender Report</button>
        <button onClick={() => goToReport('/totalamountuser')} className="report-link2">Report on total amount user spent </button>
        <button onClick={() => goToReport('/packagereport')} className="report-link2">Report on packages </button>
        <button onClick={() => goToReport('/reportE&P')} className="report-link2">Report on employee's handling packages </button>

      </div>
      <p className="report-description">
      Select a report to view.
      </p>
    </div>
  );
};

export default Reports;
