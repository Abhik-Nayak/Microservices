import axios from 'axios';
import React, { useState } from 'react'
// import TextField from '@material-ui/core/TextField';
import "./LoginForm.css"
function LoginForm() {
    const [userEmailReg, setUserEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const accessToken ="27ddc34a82042a348041476b20d1c519a03b2bf85cbf63cf7670f09aee5b4177f63462290d582a3748a8e72824545f8479027ff6c1019ee444297b3d7a56148f"
    const baseURL = "http://localhost:5000";
    const authAxios = axios.create({
      baseURL: `${baseURL}/authentication/userLogin`, 
        headers: {
          Authorization : `Bearer ${accessToken}`
      }
    })
    const login = async(e) => {
      e.preventDefault()
     await authAxios.post(`/userLogin`, {
        email: userEmailReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response);
      });
      setUserEmailReg("")
      setPasswordReg("")
    };

    return (
      
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <form>

        <h3>Login Here</h3>

        <label >Username</label>
        <input type="text" placeholder="Email or Phone" id="username"  onChange={(e) => {
            setUserEmailReg(e.target.value);
          }} />

        <label >Password</label>
        <input type="password" placeholder="Password" id="password"  onChange={(e) => {
            setPasswordReg(e.target.value);
          }} />

        <button onClick={login}>Log In</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div>
    </form>
    </div>      
    
    )
}

export default LoginForm;
