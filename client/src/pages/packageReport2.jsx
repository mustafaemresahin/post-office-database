import React, { useState, useEffect } from 'react';
import '../css/salesReport.css';
import axios from 'axios';

function PackageReport2() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState({ packagesSummary: [] });
  const [success, setSuccess] = useState(0);
  const [error, setError] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const fetchPackageData = async () => {
    if (new Date(startDate) > new Date(endDate)) {
        setError('Start date must be before end date.');
        setIsReportVisible(false);
        return;
      }
      else if (startDate === '' && endDate === ''){
        setError('Select a date range');
        setIsReportVisible(false);
        return;
      }
      else if (startDate === ''){
        setError('Select a start date');
        setIsReportVisible(false);
        return;
      }
      else if (endDate === ''){
        setError('Select an end date');
        setIsReportVisible(false);
        return;
      }
      setError('');
      setIsStart(true);

    try {
      const response = await axios.get('/api/packagereport', { params: { startDate, endDate } });
      const fetchedData = response.data;
      setData(fetchedData);
      setIsReportVisible(true);
      setIsPressed(false);
      const totalPackages = fetchedData.packagesSummary.reduce((total, current) => total + current['Number of Packages'], 0);
      const acceptedPackagesData = fetchedData.packagesSummary.find(item => item.Status === 'Delivered'); // Use 'Accepted' as per your status
      const deliveredPercentage = acceptedPackagesData ? (acceptedPackagesData['Number of Packages'] / totalPackages * 100) : 0;
      setSuccess(deliveredPercentage);

    } catch (err) {
      console.error(err);
      setIsReportVisible(false);
      setError('Failed to fetch package data. Please try again later.');
    }
  };

  function lastMonth() {

    setIsPressed(false);
    setIsStart(true);

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  
    const formattedEndDate = today.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    setIsPressed(true);

  }

  function lastWeek() {

    setIsPressed(false);
    setIsStart(true);
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
  
    const formattedEndDate = today.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    setIsPressed(true);
  }

  function today() {

    setIsPressed(false);
    setIsStart(true);
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
  
    const formattedEndDate = today.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    setIsPressed(true);

  }

  useEffect(() => {
    if (startDate && endDate && isPressed) {
      fetchPackageData();
    }
  }, [startDate, endDate, isPressed]);

  return (
    <div className='report-div'>
        <a href="/reports" className='back-button'>Back</a>
      <h2>Package Report</h2>
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
      <button onClick={fetchPackageData}>Get Report</button>
      <button onClick={lastMonth} style={{'backgroundColor':'#6c757d'}}>Get Report for the this month</button>
      <button onClick={lastWeek} style={{'backgroundColor':'#6c757d'}}>Get Report for the this week</button>
      <button onClick={today} style={{'backgroundColor':'#6c757d'}}>Get Report for today</button>

      {isReportVisible && data.packagesSummary.length > 0 ? (
  <>
    <h3>Package Summary</h3>
    <table className='package-table'>
      <thead>
        <tr>
          <th>Status</th>
          <th>Number of Packages</th>
          <th>Percentage of Total Packages</th>
        </tr>
      </thead>
      <tbody>
        {data.packagesSummary.map((item, index) => (
          <tr key={index}>
            <td>{item.Status}</td>
            <td>{item['Number of Packages']}</td>
            <td>{parseFloat(item['Percentage of Total Packages']).toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="success-rate">
        <h2>Success Rate:</h2>
        <p className="success-rate-value">{success.toFixed(2)}%</p>
      </div>
  </>
) : isStart ? (
  <p>No data available for the selected date range.</p>
) : null}


    </div>
  );
}

export default PackageReport2;