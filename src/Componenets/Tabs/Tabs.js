import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState } from "react";

function Tabs() {
  const [user, setUser] = useState('');
  const [tabs, setTabs] = useState([]);
  const [data, setData] = useState([]);
  const [arr, setArr] = useState([]);

  
  const submitUser = (e) => {
    e.preventDefault();
    fetch(
      'http://localhost:5000/user',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(user),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response)
        setTabs(Object.keys(response))
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const moveto = (val) => {
    var obj = []
    obj.push(data[val])
    setArr(obj);
    // arr.push(data[val])
    // setArr([...arr]);

  }

  return (
    <>
      <div className='container col-md-4 shadow card'>
        <center><h1>SAP Users</h1></center>
        <input type="text" className="form-control mt-5 mb-3" placeholder='Enter Username...' value={user} onChange={(e) => { setUser(e.target.value) }} />
        <center><button type='submit' className='btn btn-primary mb-3' onClick={submitUser}>Submit</button></center>
      </div>

      <div className="container my-3 shadow card">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {tabs.map((value) => {
            return (<li className="nav-item" role="presentation" key={value}>
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" onClick={() => { moveto(value) }}
                type="button" role="tab" aria-controls="home" aria-selected="true">{value}</button>
            </li>)
          })}
        </ul>
        {arr.map((value, index) => (<p key={index}>{JSON.stringify(value)}</p>))}
      </div>
    </>
  );
}

export default Tabs;