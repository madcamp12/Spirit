import React, { useState } from 'react';
import './LoginForm.css'; // CSS 파일 임포트
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';

const LoginForm = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    };

    const handleLoginClick = () => {
        setShowRegisterForm(false);
    };

    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser());
    }

    return (
        <div className="login-form-container">
            {/* {!showRegisterForm ? (
                <form onSubmit={handleLogin} className="login-form">
                    <button type='button' onClick={handleLogin} >login with kakao</button>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                    <h3 onClick={handleRegisterClick}>Create Account</h3>
                </form>
            ) : (
                <form className="register-form">
                    <h2>Register</h2>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                    <h3 onClick={handleLoginClick}>Already have an account?</h3>
                </form>
            )} */}
            {/* <button type='button' onClick={handleLogin} >login with kakao</button> */}
            <div className="mb-10 mt-5 flex items-center justify-center">
                <p className="text-body-color text-2xl dark:text-body-color-dark w-full px-5 text-center text-base">
                    Login & Register
                </p>
            </div>
            <button
                id="kakao-login-btn"
                aria-label="sign with kakao"
                onClick={handleLogin}
                className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 mb-5 flex w-full items-center justify-center rounded-sm border border-transparent bg-[#fae100] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
            >
                <span className="mr-3">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_95:967)">
                            <path
                                d="M10,0C4.48,0,0,3.54,0,7.91c0,2.84,1.9,5.33,4.74,6.73-.21.78-.76,2.83-.87,3.27-.14.54.2.54.42.39.17-.11,2.74-1.86,3.85-2.62.6.09,1.22.14,1.86.14,5.52,0,10-3.54,10-7.91S15.52,0,10,0"
                                fill="#371d1e"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_95:967">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
                Login with Kakao
            </button>
        </div>
    );
};

export default LoginForm;
