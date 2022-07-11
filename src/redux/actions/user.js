// Dispatch --> 皮球
// Reducer --> 帮助react发信号(action) + 储存信号反馈信息(reducer)
// dispatch 跨文件发信号


import { message } from "antd";

const axios = require('axios')
const md5 = require('md5')

export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'login/LOGIN_FAIL'
export const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAIL = 'user/GET_USER_INFO_FAIL'
export const SAVE_USER_INFO = 'user/SAVE_USER_INFO'
export const LOGOUT = 'login/LOGOUT'
export const REG_SUCCESS = 'reg/REG_SUCCESS'
export const REG_FAIL = 'reg/REG_FAIL'
export const SHOWNOTICE = 'reg/SHOWNOTICE'
export const CLOSENOTICE = 'reg/CLOSENOTICE'
export const GET_USER_DATA = 'user/GET_USER_DATA'
export const SAVE_USER_LIST = 'user/SAVE_USER_LIST'
export const CLEAR_USER_ELSE_DATA = 'user/CLEAR_USER_ELSE_DATA';



//User Info
export function getUserData (email) { //Get other people's data
  const data = {
    email: email
  }
  return function (dispatch) {
    return axios
      .post('/api/user/get_userinfo', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(saveUserInfo_else(response.data))
        } else {}
      })
      .catch(() => { })
      .finally(() => { })
  }
}
function saveUserInfo_else(data){
  return {
    type: GET_USER_DATA,
    data: data.data

  }
}
export function deleteUserInfo_else(data){
  return {
    type: CLEAR_USER_ELSE_DATA,
    data: data.data

  }
}
function saveUserInfo_main (res) {
  return {
    type: SAVE_USER_INFO,
    data: res.data
  }
}
function deleteUserInfo () {
  return {
    type: LOGOUT
  }
}
export function getUserInfo (callback = () => null) { // get current user's data (main get)
  return function (dispatch) {
    return axios
      .post('/api/user/userinfo')
      .then(response => {
        if (response.data.code == 0) {
          console.log('getUserInfoSuccess and code===0')
          dispatch(saveUserInfo_main(response.data))
        } else {}
      })
      .catch(() => {
        dispatch(getUserInfoFail())
      })
      .finally(() => {
        callback()
      })
  }
}
// Login
function loginSuccess () {
  return {
    type: LOGIN_SUCCESS
  }
}
function loginFail () {
  return {
    type: LOGIN_FAIL
  }
}
export function login (values, successCallback = () => null, failureCallback = () => null) {
  return function (dispatch) {
    // console.log(values)
    const encryptedPassword = md5(values.password)
    return axios
      .post('/api/user/login', {
        password: encryptedPassword,
        ...values
      })
      .then(response => {
        if (response.data.code == 0) {
          dispatch(loginSuccess())
          dispatch(getUserInfo())
          message.success('✨SUCCESS✨');
          successCallback()
        } else {
          message.error('Something went wrong...');
          // failureCallback()
        }
      })
      .catch(exc => {
        message.error('Something went wrong...');
        dispatch(loginFail())
      })
  }
}
// Logout
export function logout (callback = () => null) {
  const choice = confirm("你确定要退出登陆吗？\n Are you sure you want to logout?")
  if(choice){
    return function (dispatch) {
      return axios
        .post('/api/user/logout')
        .then(response => {
          if (response.data.code == 0) {
            message.success('待会儿见 See ya ');
            // callback()
            dispatch(deleteUserInfo())
            window.location.replace("/")
            
          } else {
            message.error('Something went wrong...');
          }
        })
        .catch(() => {
          message.error('Something went wrong...');
        })
    }
  }
}
//Reg
export function reg (props, callback = () => null) {
  return function (dispatch) {
    // console.log(props)
    // const encryptedPassword = md5(props.password)
    return axios.post('/api/user/reg', {
      ...props
    })
      .then(
        response => {
          if (response.data.code == 0) {
            message.success('✨SUCCESS✨');
            dispatch(login(props))
          } else if (response.data.code == 102) {
            message.error('Are you sure this is your Email?');
          } else if (response.data.code == 106) {
            message.error('验证码错误 Invalid Verification Code');
          }
          else {
            message.error('你的邮箱被占用了！！ Your email may be occupied');
          }
        }
      )
      .catch(() => {
        callback()
      })
      .then(() => {
        callback()
      })
  }
}
export function emailVerification (email) {
  const data = {
    "email": email
  }

  if (email == "") {
    message.error('邮箱错误 Invalid Email');
  } else {
    return function (dispatch) {
      return axios
        .post('/api/user/get_email_ver', data)
        .then(response => {
          message.success('已发送验证码  Verification code sent');
        })
        .catch(() => {
        })
        .finally(() => {
        })
    }
  }
}
export function showNotice(){
  return {
    type: SHOWNOTICE
  }
}
export function closeNotice(){
  return function (dispatch) {
    return axios
      .post('/api/user/setNotice')
      .then(response => {
        dispatch(setNotice())
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function setNotice(){
  return {
    type: CLOSENOTICE
  }
}
export function newNotice(data) {
  return function (dispatch) {
    return axios
      .post('/api/events/setBulletin', data)
      .then(response => {
        if (response.data.code == 0) {
          message.success('✨SUCCESS✨');
        } else {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function editPersonalInfo(data){
  return function (dispatch) {
    return axios
      .post('/api/user/setuserinfo', data)
      .then(response => {
        if (response.data.code == 0) {
          message.success('✨SUCCESS✨');
          dispatch(getUserInfo());
        } else {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function userFilter(data){
  return function (dispatch) {
    return axios
      .post('/api/user/user_filter', data)
      .then(response => {
        if (response.data.code == 0) {
          dispatch(saveUserList(response.data.data));
        } else {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function saveUserList(data){
  return {
    type: SAVE_USER_LIST,
    data: data
  }
}