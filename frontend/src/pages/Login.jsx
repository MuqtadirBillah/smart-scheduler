import React, { useState, useContext } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from "react-router-dom"
import DynamicHead from "../components/DynamicHead";
import { setUser } from "../app/features/user/userSlice";

function Login(){
    const dispatch = useDispatch()
    let navigate = useNavigate();
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [warning, setWarning] = useState('');
    var [passwordType, setPasswordType] = useState('password');
    var [eye, setEye] = useState('fas fa-eye');
    let baseUrl;
    baseUrl = useSelector((state) => state.global.value.baseUrl);
    let user = useSelector((state) => state.user.value)

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function loginUser(){
        if(email.length>0 && password.length>0){
            if(re.test(String(email).toLowerCase())){
                axios.post(`${baseUrl}/api/auth/login`, {email: email, password: password})
                .then(function(response){
                    console.log(response);
                    if(response.data.status=='success'){
                        Cookies.set('userCookie', response.data.token);
                        console.log(response.data.data)
                        dispatch(setUser(response.data.data));
                        navigate("/");
                    }
                })
                .catch(function(error){
                    console.log(error)
                    if(error.response.data.error=='Invalid Credentials!' || error.response.data.error=='Invalid Credentials'){
                        toast('Invalid Credentials!')
                    }
                    else{
                        toast('Something went wrong!')
                    }
                })
            }
            else{
                toast('Invalid Email Address');
            }
        }
        else{
            toast('Please fill all fields')
        }
    }

    function passwordd(){
        if(passwordType=='text'){
            setPasswordType('password')
            setEye('fas fa-eye-slash')
        }
        else{
            setPasswordType('text')
            setEye('fas fa-eye')
        }
    }
    return(
        <>
            <DynamicHead 
                title="Login"
                description="Login to your account to access more features!"
                keywords=""
                og="og.png"
            />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="login">
                {/* <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                /> */}
                <div className="container-fluid">
                    <span className="homeIcon"><Link to='/'><a><i className="fas fa-home"></i></a></Link></span>
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 leftt">
                            <img src="/assets/images/scheduler-back.jpg" alt="" />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 align-self-center rightt">
                            <div>
                                <img src="/assets/images/logo.png" alt="login-logo" />
                                <h1 className="mainSectionHeading">Login</h1>
                                <h5>Welcome back!</h5>
                                <div className="form">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>Email Address</h5>
                                                <input type="text" onChange={(e)=>{setEmail(e.target.value); setWarning('');}} placeholder="Your Email" />
                                            </div>
                                            <div className="col-12">
                                                <h5>Password</h5>
                                                <span className="passwordCol">
                                                    <input data-clarity-unmask="True" type={passwordType} onKeyDown={(e)=>{(e.key=='Enter') && loginUser();}} onChange={(e)=>{setPassword(e.target.value); setWarning('');}} placeholder="Your Password" />
                                                    <span onClick={()=>{passwordd()}}><i className={eye}></i></span>
                                                </span>
                                            </div>
                                            <div className="col-12">
                                                {/* <p>Don't have an account? <Link to='/create-account'><a>Create an account</a></Link></p> */}
                                                <p>Forgot Password? <Link to='/forgot-password'><a>Reset Password</a></Link></p>
                                                <p>{warning}</p>
                                                <button onClick={()=>{loginUser();}}>Login</button>
                                                <Link to='/create-account'><a><button className="createBut">Create Account</button></a></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default Login;