import {
    SAVE_LOCATION_CONTINENT,
    SAVE_LOCATION_CITY,
    SAVE_LOCATION_PROVINCE,
    SAVE_LOCATION_COUNTRY,
    SAVE_SUBJECTS,
    SAVE_AGEGROUP,
    SAVE_SERVICESTATUSES
} from "actions/tags"

  
const initState = {
    continents: null,
    countries:null,
    provinces: null,
    cities: null,
    areas: null,
    streets: null,
    subjects: null,
    serviceStatuses: null,
    ageGroups: null
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
        case SAVE_LOCATION_CONTINENT:
            return {
                ...state,
                continents: action.data,
            }
        case SAVE_LOCATION_COUNTRY:
            return {
                ...state,
                countries: action.data,
            }
        case SAVE_SUBJECTS:
            return {
                ...state,
                subjects: action.data,
            }
        case SAVE_AGEGROUP:
            return {
                ...state,
                ageGroups: action.data,
            }
        case SAVE_SERVICESTATUSES:
            return {
                ...state,
                serviceStatuses: action.data,
            }
      default:
        return state
    }
  }
  