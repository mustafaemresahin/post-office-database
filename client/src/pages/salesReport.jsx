import React, { useState, useEffect } from 'react';
import '../css/salesReport.css';
import axios from 'axios';

function SalesReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState({ salesSummary: [], transactionDetails: [] });
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [error, setError] = useState('');

  const fetchSalesData = async () => {
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date must be before end date.');
      setIsReportVisible(false);
      return;
    }
    setError('');
    setIsReportVisible(false);

    try {
      const response = await axios.get('/api/sales', { params: { startDate, endDate } });
      setData(response.data);
      setIsReportVisible(true);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch sales data. Please try again later.');
      setIsReportVisible(false);
    }
  };

  function lastMonth() {

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  
    const formattedEndDate = today.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

  }

  function lastWeek() {

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
  
    const formattedEndDate = today.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

  }

  function today() {

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
  
    const formattedEndDate = today.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

  }

  useEffect(() => {
    if (startDate && endDate) {
      console.log(endDate);
      console.log(startDate);
      fetchSalesData();
    }
  }, [startDate, endDate]);
  

  return (
    <div className='report-div'>
      <h2>Sales Report</h2>
      <div className='input-div'>
        <label>
          Start Date:
          <input
            className='date-input'
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            className='date-input'
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={fetchSalesData}>Get Report</button>
      <button onClick={lastMonth}>Get Report for the last month</button>
      <button onClick={lastWeek}>Get Report for the last week</button>
      <button onClick={today}>Get Report for today</button>

      {isReportVisible && (
        <>
          <h3>Sales Summary</h3>
          <table className='sales-table'>
            <thead>
                <tr>
                <th>Number of Transactions</th>
                <th>Average Transaction Value</th>
                <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody>
                {data.salesSummary.map((item, index) => (
                <tr key={index}>
                    <td>{item.NumberOfTransactions}</td>
                    <td>${parseFloat(item.AverageTransactionValue).toFixed(2)}</td>
                    <td>${item.TotalRevenue}</td>
                </tr>
                ))}
            </tbody>
            </table>

          <h3>Detailed Transactions</h3>
          <table className='detailed-table'>
            <thead>
                <tr>
                <th></th>
                <th>Transaction Date</th>
                <th>Total Amount</th>
                <th>User Name</th>
                <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {data.transactionDetails.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(item.TransactionDate).toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                    <td>${parseFloat(item.TotalAmount).toFixed(2)}</td>
                    <td>{item.firstname} {item.lastname}</td>
                    <td>{item.Email}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
      )}
    </div>
  );
}

export default SalesReport;
