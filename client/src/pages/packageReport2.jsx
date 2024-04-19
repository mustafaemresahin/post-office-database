import React, { useState, useEffect } from 'react';
import '../css/salesReport.css';
import axios from 'axios';

function PackageReport2() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState({ packagesSummary: [] });
  /*const [success, setSuccess] = useState(0);*/
  const [error, setError] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [packages, setPackages] = useState({ packages: [] });
  const [status, setStatus] = useState('');


  const getPackagesByStatus = async (status) => {
    try {
      const packagesByStatus = await axios.get('/api/packagesbystatus', { params: { startDate, endDate, status } });
      setPackages(packagesByStatus.data);
      console.log(packagesByStatus.data);
      console.log({ startDate, endDate, status });
      setStatus(status);

    } catch (err) {
      console.error(err);
    }
  }

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
      //const totalPackages = fetchedData.packagesSummary.reduce((total, current) => total + current['Number of Packages'], 0);
      //const acceptedPackagesData = fetchedData.packagesSummary.find(item => item.Status === 'Delivered'); // Use 'Accepted' as per your status
      //const deliveredPercentage = acceptedPackagesData ? (acceptedPackagesData['Number of Packages'] / totalPackages * 100) : 0;
      //setSuccess(deliveredPercentage);
      getPackagesByStatus("Delivered");

    } catch (err) {
      console.error(err);
      setIsReportVisible(false);
      setError('Failed to fetch package data. Please try again later.');
    }
  };

  function lastMonth() {

    setIsPressed(false);

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
  
    const formattedEndDate = tomorrow.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    setIsPressed(true);

  }

  function lastWeek() {

    setIsPressed(false);

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
  
    const formattedEndDate = tomorrow.toISOString().split('T')[0];
    const formattedStartDate = oneMonthAgo.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    setIsPressed(true);
  }

  function today() {

    setIsPressed(false);

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
  
    const formattedEndDate = tomorrow.toISOString().split('T')[0];
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
      <button onClick={lastMonth} style={{'backgroundColor':'#6c757d'}}>Get Report for the past 30 days</button>
      <button onClick={lastWeek} style={{'backgroundColor':'#6c757d'}}>Get Report for the past 7 days</button>
      <button onClick={today} style={{'backgroundColor':'#6c757d'}}>Get Report for today</button>

      {isReportVisible && data.packagesSummary.length > 0 ? (
  <>
    <h3>Package Summary</h3>
    <h3>({startDate} - {endDate})</h3>
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
    {/*
    <div className="success-rate">
          <h2>Success Rate:</h2>
          <p className="success-rate-value">{success.toFixed(2)}%</p>
      </div>
    */}
    <br></br>
      <hr></hr>
      <h3>List of Packages by Status</h3>
      <div className='status-select-div'>
          <h1 className='status-select-label'>Status:</h1>
          <select value={status} onChange={(event) => getPackagesByStatus(event.target.value)} className='select-status'>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Accepted">Accepted</option>
          </select>
      </div>
      {packages.packages.length > 0 ? (
        <>
        <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Date Sent</th>
          <th>Type</th>
          <th>Destination</th>
          <th>Sender</th>
        </tr>
      </thead>
      <tbody>
      {packages.packages.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.Status}</td>
            <td>{(new Date(item.DateSent).toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))}</td>
            <td>{item.Type}</td>
            <td>{item.Destination}</td>
            <td>{item.firstname} {item.lastname}</td>
          </tr>
        ))}

      </tbody>
    </table>
        </>
      ): <p style={{'textAlign':'center'}}>0 {status} packages from {startDate} to  {endDate}.</p> }
      
  </>
) : isStart ? (
  <p>No data available for the selected date range ({startDate} - {endDate}).</p>
) : null}
      
    </div>
  );
}

export default PackageReport2;