import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/register.css';
import '../css/vehicles.css';

const VehiclesTable = () => {
  const [storeitems, setStoreItems] = useState([]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const response = await axios.get('/api/storeitem'); 
        setStoreItems(response.data);
      } catch (error) {
        console.error('Error fetching store items:', error);
      }
    };

    fetchStoreItems();
  }, []);



  return (
    <div className='inventory-container'>
      <div className='inventory'>
        <div className='inv'>
        <h1>Store Items</h1>
        <table className='inventoryy'>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Inventory</th>
              <th>Post Office ID</th>
      
            </tr>
          </thead>
          <tbody>
          {storeitems && storeitems.map((items) => {
          
                        return (
                            <tr key={items.ItemID} className="user-tr">
                                <td>{items.ItemID}</td>
                                <td>{items.Name}</td>
                                <td>{items.Cost}</td>
                                <td>{items.Inventory}</td>
                                <td>{items.PostOfficeID}</td>
                               
                                  {/*<button onClick={("/addvehicles")}>Add</button>*/}
                                  {/* <button>Edit </button>
                                  <button onClick={() => handleDeleteVehicle(user.VehicleID)}>Delete</button>                                </td> */}
                            </tr>
                        )
                    
                    })}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default VehiclesTable;