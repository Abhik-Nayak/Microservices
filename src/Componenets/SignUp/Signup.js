import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup() {
    const navigate = useNavigate();
    const [userNameReg, setUserNameReg] = useState("");
    const [userEmailReg, setUserEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    // const [loginStatus, setLoginStatus] = useState("");
    const baseURL = "http://localhost:5000";
    const register = async (e) => {
        e.preventDefault()
        await axios.post(`${baseURL}/authentication/posts`, {
            name: userNameReg,
            email: userEmailReg,
            password: passwordReg,
        }).then((response) => {
                console.log(response);
            });
        setUserNameReg("")
        setUserEmailReg("")
        setPasswordReg("")
        navigate('/logIn')
    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
                <h3>Sign Up Here</h3>
                <form>

                    {/*  */}
                    <label >Username</label>
                    <input type="text" placeholder="username" onChange={(e) => {
                        setUserNameReg(e.target.value);
                    }} />


                    <label >Email</label>
                    <input type="text" placeholder="Email or Phone" onChange={(e) => {
                        setUserEmailReg(e.target.value);
                    }} />

                    <label >Password</label>
                    <input type="password" placeholder="Password" onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }} />

                    <button onClick={register}>Sign Up</button>

                    <div className="social">
                        <div className="go"><i className="fab fa-google"></i>  Google</div>
                        <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup;
