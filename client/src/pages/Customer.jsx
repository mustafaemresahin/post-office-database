import axios from 'axios';
import React, {useEffect, useState} from 'react'
import '../css/customer.css';
function Customer() {
    const [data,setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/users')
        .then(res => setData(res.data))
        .catch(er => console.log(er));
    }, [])
    
    return (
        <div>
            <table> 
                <thread> 
                <tr>UserID</tr>
                <tr>CustomerUser</tr>
                <tr></tr>
                </thread>
            </table>
            <ttbody>
                {
                    data.map((user, index) => (
                        <tr key={index}>
                            <td>{user.UserID}</td>
                            <td>{user.CustomerUser}</td>
                        </tr>
                    )
                    )
                    
                }
            </ttbody>
        </div>
    
    )
}

export default Customer; 
