import {
    SAVE_LOCATION_AREA,
    SAVE_LOCATION_CITY,
    SAVE_LOCATION_PROVINCE,
    SAVE_LOCATION_STREET
  } from "actions/databank"
   
  
  const initState = {
    provinces: null,
    cities: null,
    areas: null,
    streets: null
  }
  
  export default function reducer (state = initState, action) {
    switch (action.type) {
      case SAVE_LOCATION_PROVINCE:
        return {
          ...state,
          provinces: action.data
        }
      case SAVE_LOCATION_CITY:
        return {
          ...state,
          cities: action.data
        }
      case SAVE_LOCATION_AREA:
        return {
          ...state,
          areas: action.data,
        }
      case SAVE_LOCATION_STREET:
        return {
          ...state,
          streets: action.data,
        }
        
      default:
        return state
    }
  }
  