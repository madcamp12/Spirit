import axios from "axios";
import { ALL_MESSAGES_FAIL, ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, CLEAR_ERRORS, NEW_MESSAGE_FAIL, NEW_MESSAGE_REQUEST, NEW_MESSAGE_SUCCESS } from "../constants/messageConstants";
import { Cookies } from "react-cookie";

// Get All Messages
export const getAllMessages = (chatId) => async (dispatch) => {
    try {

        const cookie = new Cookies();
        dispatch({ type: ALL_MESSAGES_REQUEST });

        const body = {
            token: cookie.get('token'),
        }
        // test
        const { data } = await axios.post(`https://madcamp.dhki.kr/messages/${chatId}`, body);

        dispatch({
            type: ALL_MESSAGES_SUCCESS,
            payload: data.messages,
        });

    } catch (error) {
        dispatch({
            type: ALL_MESSAGES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Message
export const sendMessage = (msgData) => async (dispatch) => {
    try {
        const cookie = new Cookies();
        dispatch({ type: NEW_MESSAGE_REQUEST });
        
        const body = {
            ...msgData,
            token: cookie.get('token')
        }
        const { data } = await axios.post('https://madcamp.dhki.kr/messages/newMessage', body);

        dispatch({
            type: NEW_MESSAGE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: NEW_MESSAGE_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}