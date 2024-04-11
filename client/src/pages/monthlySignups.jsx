import React, { useState } from 'react';
import axios from 'axios';
import '../css/salesReport.css';

function MonthlySignups() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState(('0' + (new Date().getMonth() + 1)).slice(-2));
  const [data, setData] = useState({ totalSignUps: 0, users: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [start, setStart] = useState(false);

  const yearOptions = Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => 2020 + i);

  const monthOptions = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const fetchMonthlySignups = async () => {
    setStart(true);
    console.log(month);
    console.log(year);
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/monthlysignups', { params: { year, month } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching monthly signups:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='report-div'>
      <h2>Monthly Signups</h2>
      <div className='input-div-signups'>
        <label>
          Year:
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {yearOptions.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </label>
        <label>
          Month:
          <select value={month} onChange={(e) => setMonth(('0' + e.target.value).slice(-2))}>
            {monthOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className='signup-report-button-div'>
            <button onClick={fetchMonthlySignups} className='signup-report-button'>Get Report</button>
        </div>
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {start && <p>Total Signups: {data.totalSignUps}</p>}
          {data.users.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Date Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.CustomerUser}</td>
                    <td>{user.Email}</td>
                    <td>{new Date(user.dateSignedUp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : start && (
            <p>No signups in the selected month and year.</p>
          )}
        </>
      )}
    </div>
  );
  
}

export default MonthlySignups;
