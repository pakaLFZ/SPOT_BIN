// Dispatch --> 皮球
// Reducer --> 帮助react发信号(action) + 储存信号反馈信息(reducer)
// dispatch 跨文件发信号


import { message } from "antd";

const axios = require('axios')
const md5 = require('md5')

export const SAVE_LOCATION_AREA = 'databank/SAVE_LOCATION_AREA'
export const SAVE_LOCATION_CITY = 'databank/SAVE_LOCATION_CITY'
export const SAVE_LOCATION_PROVINCE = 'databank/SAVE_LOCATION_PROVINCE'
export const SAVE_LOCATION_STREET = 'databank/SAVE_LOCATION_STREET';

//User Info
export function requestProvinceList () { //Get other people's data
  const data = {
    province: false,
    city: false,
    area: false
  }
  return function (dispatch) {
    return axios
      .post('/api/databank/search_location', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(saveProvinceList(response.data))
        } else {}
      })
      .catch(() => { })
      .finally(() => { })
  }
}
function saveProvinceList(data){
  return {
    type: SAVE_LOCATION_PROVINCE,
    data: data.data
  }
}

export function requestCityList (data) { //Get other people's data
    return function (dispatch) {
      return axios
        .post('/api/databank/search_location', data)
        .then(response => {
          if (response.data.code === 0) {
            dispatch(saveCityList(response.data))
          } else {}
        })
        .catch(() => { })
        .finally(() => { })
    }
}
function saveCityList(data){
    return {
        type: SAVE_LOCATION_CITY,
        data: data.data
    }
}

export function requestAreaList (data) { //Get other people's data
    return function (dispatch) {
      return axios
        .post('/api/databank/search_location', data)
        .then(response => {
          if (response.data.code === 0) {
            dispatch(saveAreaList(response.data))
          } else {}
        })
        .catch(() => { })
        .finally(() => { })
    }
}
function saveAreaList(data){
    return {
        type: SAVE_LOCATION_AREA,
        data: data.data
    }
}

export function requestStreetList (data) { //Get other people's data
    return function (dispatch) {
      return axios
        .post('/api/databank/search_location', data)
        .then(response => {
          if (response.data.code === 0) {
            dispatch(saveStreetList(response.data))
          } else {}
        })
        .catch(() => { })
        .finally(() => { })
    }
}
function saveStreetList(data){
    return {
        type: SAVE_LOCATION_STREET,
        data: data.data
    }
}

