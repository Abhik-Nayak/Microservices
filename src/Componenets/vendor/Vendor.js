import React,{useState} from "react";

function Vendor(){

    const [num, setNum] = useState("");
    const [det, setDet] = useState([]);

    const baseUrl='http://localhost:5000';
    const submit = (e) => {
      e.preventDefault(); 
        fetch(
              `${baseUrl}/authentication/posts`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(num),
              }
            )
              .then((response) => response.json())
              .then((response) => {
                setDet([response.GENERALDETAIL]);
              })
              .catch((error) => { 
                console.error(error);
              });
  

      // if(!num){
      //   alert('field cannot be empty');
      // }else{
      //  
      //   console.log(num);
      //   setNum('');
      // }
    }
  

    return(
        <>
        <div className='container col-md-4 shadow card '>
        <center><h1>SAP Vendor</h1></center>
        {/*  <label className="form-label mt-5"><h6>vendor Number</h6></label>  */}
        <input type="text" className="form-control mt-5 mb-3" placeholder='Enter vendor Number...' value={num} onChange={(e) =>{setNum(e.target.value)}}/>
        <center><button type='submit' className='btn btn-primary mb-3' onClick={submit}>Submit</button></center>
        </div> 

        <div className='container  card shadow'>
        <table className="table">
    <thead>
        <tr>
        <th scope="col">VENDOR</th>
        <th scope="col">NAME</th>
        <th scope="col">CITY</th>
        <th scope="col">POSTL_CODE</th>
        <th scope="col">REGION</th>
        <th scope="col">STREET</th>
        <th scope="col">COUNTRY</th>
        <th scope="col">COUNTRY_ISO</th>
        <th scope="col">LANGU</th>
        <th scope="col">LANGU_ISO</th>
        <th scope="col">FORMOFADDR</th>
        </tr>
    </thead>
    <tbody>
    {det.map((value,index)=>(
        <tr key={index}>
        <th scope="row">{value.VENDOR}</th>
        <td>{value.NAME}</td>
        <td>{value.CITY}</td>
        <td>{value.POSTL_CODE}</td>
        <td>{value.REGION}</td>
        <td>{value.STREET}</td> 
        <td>{value.COUNTRY}</td>
        <td>{value.COUNTRYISO}</td>
        <td>{value.LANGU}</td>
        <td>{value.LANGU_ISO}</td>
        <td>{value.FORMOFADDR}</td>            
        </tr>))}
    </tbody>
    </table>
        </div>
        </>
    );
}

export default Vendor;