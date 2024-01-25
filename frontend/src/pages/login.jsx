import React, { useEffect } from "react";
import { Loading } from "../components/Intro/Loading";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getInitialData, loginSuccess } from "../actions/userAction";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function KakaoLogin(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code")

    const loginRequest = async () => {
        if(code){
            const data = {
                redirect_uri: 'https://spirit-xi.vercel.app/login',
                code: code
            };

            axios.post('https://madcamp.dhki.kr/users/login/kakao', data) // login request
                .then(response => {
                    if(response.status == 200){
                        const { token } = response.data;

                        const cookie = new Cookies();
                        cookie.set('token', token, { expires: new Date(Date.now() + 20 * 60 * 60 * 1000) });

                        // inform to redux : success login !!
                        dispatch(loginSuccess(response.data));
                    }
                })
                .catch(error => {
                    alert(error);
                    navigate(`/intro`);
                })
        }else{ // there's no authentication code?
            navigate(`/intro`);
        }
    }

    const {loading, isAuthenticated, error, user} = useSelector((state) => state.user);
    useEffect(() => {
        loginRequest();
    }, []);

    useEffect(() => {
        console.log(isAuthenticated);
        if(isAuthenticated){
            console.log(user);
            // window.location.href = '/home';
            navigate(`/home`);
        }
    }, [isAuthenticated])

    return(
        // 로그인이 되는 동안.. 대기 화면..
        <Loading/>
    )
}

export default KakaoLogin;