import axios from "axios";
import { ALL_CHATS_FAIL, ALL_CHATS_REQUEST, ALL_CHATS_SUCCESS, CLEAR_ERRORS, NEW_CHAT_FAIL, NEW_CHAT_REQUEST, NEW_CHAT_SUCCESS } from "../constants/chatConstants";
import { Cookies } from "react-cookie";


const cookie = new Cookies();

// Get All Chats
export const getAllChats = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CHATS_REQUEST });
        const body = {
            token: cookie.get('token')
        }

        const { data } = await axios.post('https://madcamp.dhki.kr/chats/get', body);
        
        if(data.success){
            dispatch({
                type: ALL_CHATS_SUCCESS,
                payload: data.chats,
            });
        }else{
            dispatch({
                type: ALL_CHATS_FAIL,
                payload: data,
            });
        }
        

    } catch (error) {
        dispatch({
            type: ALL_CHATS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Chat
export const addNewChat = (userId) => async (dispatch) => {
    try {
        
        dispatch({ type: NEW_CHAT_REQUEST });

        const token = cookie.get('token');
        const body = {
            token: token,
            receiverId: userId
        }
        const { data } = await axios.post("https://madcamp.dhki.kr/chats/newChat", body);

        if(data.success){
            dispatch({
                type: NEW_CHAT_SUCCESS,
                payload: data,
            });
        }else{
            dispatch({
                type: NEW_CHAT_FAIL,
                payload: data,
            });
        }

    } catch (error) {
        dispatch({
            type: NEW_CHAT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}