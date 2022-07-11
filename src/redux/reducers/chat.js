import {
    CHATLIST_STORE,
    MESSAGELIST_STORE
  } from 'actions/chat'
  
  const initState = {
    chatList: null,
    messageList: null
  }
  
  export default function reducer (state = initState, action) {
    switch (action.type) {
    // --------paper
      case CHATLIST_STORE:
        // console.log("influxed");
        return {
          ...state,
          chatList: action.data
        }
      case MESSAGELIST_STORE:
        // console.log("influxed");
        return {
          ...state,
          messageList: action.data
        }
   
      default: 
        return {
        ...state
        }
    }
  }
  