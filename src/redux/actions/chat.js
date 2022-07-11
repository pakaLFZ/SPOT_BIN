const axios = require('axios');

// import Toast from 'component/Toast'
import { message } from "antd";

export const CHATLIST_STORE = 'chat/CHATLIST_STORE';
export const MESSAGELIST_STORE = 'chat/MESSAGELIST_STORE';

// export const CLEAR_DATA = "sparkle/CLEAR_DATA";

export function message_send (data) {  
  return function (dispatch) {
    return axios
      .post('/api/chat/message_send', data)
      .then(response => {
        if (response.data.code === 0) {
            
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function chatList_get () {  
    return function (dispatch) {
      return axios
        .post('/api/chat/chatList_get')
        .then(response => {
          if (response.data.code === 0) {
              dispatch(chatList_store(response.data.data))
          } else {}
        })
        .catch(() => {
        })
        .finally(() => {
        })
    }
}
function chatList_store(data){
  return {
    type: CHATLIST_STORE,
    data: data,
  }
}
export function messageList_get(data){
  return function (dispatch) {
    return axios
      .post('/api/chat/message_get', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(messageList_store(response.data.data))     
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function messageList_store(data){
  return {
    type: MESSAGELIST_STORE,
    data: data,
  }
}