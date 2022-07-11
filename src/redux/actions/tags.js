// Dispatch --> 皮球
// Reducer --> 帮助react发信号(action) + 储存信号反馈信息(reducer)
// dispatch 跨文件发信号


import { message } from "antd";

const axios = require('axios')
const md5 = require('md5')

export const SAVE_LOCATION_PROVINCE = 'tags/SAVE_LOCATION_PROVINCE'
export const SAVE_LOCATION_CITY = 'tags/SAVE_LOCATION_CITY'
export const SAVE_LOCATION_CONTINENT = 'tags/SAVE_LOCATION_CONTINENT'
export const SAVE_LOCATION_COUNTRY = 'tags/SAVE_LOCATION_COUNTRY';
export const SAVE_SUBJECTS = 'tags/SAVE_SUBJECTS';
export const SAVE_AGEGROUP = 'tags/SAVE_AGEGROUP';
export const SAVE_SERVICESTATUSES = 'tags/SAVE_SERVICESTATUSES';

//User Info
export function requestLocation (data) { //Get other people's data
  return function (dispatch) {
    return axios
      .post('/api/tags/search_location', data)
      .then(response => {
        if (response.data.code === 0) {
          if (response.data.type == "continent"){
            dispatch(saveContinentList(response.data.data))
          } else if (response.data.type == "country") {
            dispatch(saveCountryList(response.data.data))
          } else if (response.data.type == "province") {
            dispatch(saveProvinceList(response.data.data))
          } else if (response.data.type == "city") {
            dispatch(saveCityList(response.data.data))
          }
        } else {}
      })
      .catch(() => { })
      .finally(() => { })
  }
}
function saveContinentList(data){
  return {
      type: SAVE_LOCATION_CONTINENT,
      data: data
  }
}
function saveCountryList(data){
  return {
      type: SAVE_LOCATION_COUNTRY,
      data: data
  }
}
function saveProvinceList(data){
  return {
    type: SAVE_LOCATION_PROVINCE,
    data: data
  }
}
function saveCityList(data){
    return {
        type: SAVE_LOCATION_CITY,
        data: data
    }
}


export function requestSubjectList(){
    return function (dispatch) {
        return axios
          .post('/api/tags/subject_fetch')
          .then(response => {
            if (response.data.code === 0) {
              dispatch(saveSubjectList(response.data))
            } else {}
          })
          .catch(() => { })
          .finally(() => { })
      }
}
function saveSubjectList(data){
    return {
      type: SAVE_SUBJECTS,
      data: data.data
    }
}

export function requestAddSubject(title){
    const data = {
        title: title
    }
    return function (dispatch) {
        return axios
          .post('/api/tags/subject_add', data)
          .then(response => {
            if (response.data.code == 0) {
                dispatch(saveSubjectList(response.data))
                message.success('✨SUCCESS✨');
            } else if (response.data.code === 401){
                message.info(title + ' already exists as one of our tags');
            }
          })
          .catch(() => { })
          .finally(() => { })
      }
}

export function requestAgeGroupList(){
  return function (dispatch) {
      return axios
        .post('/api/tags/agegroup_fetch')
        .then(response => {
          if (response.data.code === 0) {
            dispatch(saveAgeGroupList(response.data))
          } else {}
        })
        .catch(() => { })
        .finally(() => { })
    }
}
function saveAgeGroupList(data){
  return {
    type: SAVE_AGEGROUP,
    data: data.data
  }
}

export function requestAddServiceStatus(title){
  const data = {
      title: title
  }
  return function (dispatch) {
      return axios
        .post('/api/tags/servicestatus_add', data)
        .then(response => {
          if (response.data.code == 0) {
              dispatch(saveSubjectList(response.data))
              message.success('✨SUCCESS✨');
          } else if (response.data.code === 401){
              message.info(title + ' already exists as one of our tags');
          }
        })
        .catch(() => { })
        .finally(() => { })
    }
}

export function requestServiceStatusList(){
  return function (dispatch) {
      return axios
        .post('/api/tags/servicestatus_fetch')
        .then(response => {
          if (response.data.code === 0) {
            dispatch(saveServiceStatusList(response.data))
          } else {}
        })
        .catch(() => { })
        .finally(() => { })
    }
}
function saveServiceStatusList(data){
  return {
    type: SAVE_SERVICESTATUSES,
    data: data.data
  }
}