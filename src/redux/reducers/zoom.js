import {
    SAVELINK,
  } from "actions/zoom"
   
  
  const initState = {
    data: null,
  }
  
  export default function reducer (state = initState, action) {
    switch (action.type) {
      case SAVELINK:
        console.log(action.link);
        return {
          ...state,
          data: action.link
        }
      default:
        return state
    }
  }
  