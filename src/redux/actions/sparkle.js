const axios = require('axios');

// import Toast from 'component/Toast'
import { message } from "antd";

export const INFLUX_SUCCESS = 'sparkle/INFLUX_SUCCESS';
export const STORE_SPARKLE_ID = "sparkle/STORE_SPARKLE_ID";
export const INFLUX_FAILED = 'sparkle/INFLUX_FAILED';
export const GAINED_SPARKLE_CONTENT = "sparkle/GAINED_SPARKLE_CONTENT";
export const INFLUX_CLEAR = "sparkle/INFLUX_CLEAR"
export const USER_INFLUX_SUCCESS = 'sparkle/USER_INFLUX_SUCCESS';
export const LOCATED = "sparkle/LOCATED";
export const SET_FIELD = "sparkle/SET_FIELD";
export const SET_CHAPTER = "sparkle/SET_CHAPTER";
export const SETCHAPTERINFO = "sparkle/SETCHAPTERINFO";
export const SET_COMMENTS = "sparkle/SET_COMMENTS";
export const SET_COMMENT_DETAILS = "sparkle/SET_COMMENT_DETAILS";
export const STORE_TAGS = "sparkle/STORE_TAGS";
export const SAVE_SPARKLE_SEARCH = "sparkle/SAVE_SPARKLE_SEARCH";
export const SAVE_SPARKLE_MEMBERSINFO = "sparkle/SAVE_SPARKLE_MEMBERSINFO";

const SUCCESS = "SUCCESS"

export function sparkleSearch (content) {  
  return function (dispatch) {
    return axios
      .post('/api/databank/search_sparkle', content)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(saveSearch(response.data.data))
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function saveSearch(data){
  return {
    type: SAVE_SPARKLE_SEARCH,
    data: data,
  }
}

export function sparkleInflux (data) {  
  const dimention = data;
  return function (dispatch) {
    return axios
      .post('/api/bouquet/get_sparkle', dimention)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(clearData())
          dispatch(influxSuccess(response.data.data))
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function getSparkleInfo(id){
  const data = {
    id: id
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/get_sparkle_content', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(clearData())
          dispatch(setSparkleInfo(response.data.data))
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function setSparkleInfo(data){
  return {
    type: GAINED_SPARKLE_CONTENT,
    sparkleInfo: data,
  }
}
function influxSuccess (data) {
  return {
    type: INFLUX_SUCCESS,
    sparkleList: data,
  }
}
export function sparklePublish (id) {  
  const data = {
      "id": id
  };
  const choice = confirm("Are you sure you want to publish this project?")
  if (choice)  return function (dispatch) {
    return axios
      .post('/api/bouquet/sparkle_publish', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨SUCCESS✨');
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function getLocation (field) {
  const data = {
    field: field
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/location', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(getLocationSuccess(response.data.data))
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
}
}
function getLocationSuccess(data){
return {
  type: LOCATED,
  location: data
}
}
export function move(field, location){
const data = {
  field: field,
  ...location
}
return function (dispatch) {
  return axios
    .post('/api/bouquet/move', data)
    .then(response => {
      if (response.data.code === 0) {
      } 
    })
    .catch(() => {
    })
    .finally(() => {
    })
}

}
export function getFields(){
return function (dispatch) {
  return axios
    .post('/api/bouquet/get_fields')
    .then(response => {
      if (response.data.code === 0) {
        dispatch(setField(response.data.data))
      } 
    })
    .catch(() => {
    })
    .finally(() => {
    })
}
}
function setField(data){
return {
  type: SET_FIELD,
  field: data
}
}
export function getChapters(data){
return function (dispatch) {
  return axios
    .post('/api/bouquet/get_chapters', data)
    .then(response => {
      if (response.data.code === 0) {
        dispatch(setChapter(response.data.data))
      } 
    })
    .catch(() => {
    })
    .finally(() => {
    })
  }
}
function setChapter(data){
return {
  type: SET_CHAPTER,
  chapter: data
}
}
export function getChapterInfo(data){
return function (dispatch) {
  return axios
    .post('/api/bouquet/getchapterinfo', data)
    .then(response => {
      if (response.data.code === 0) {
        dispatch(setChapterInfo(response.data.data))
      } 
    })
    .catch(() => {
    })
    .finally(() => {
    })
}
}
function setChapterInfo(data){
return {
  type: SETCHAPTERINFO,
  chapterInfo: data
}
}
export function getComments(id){
  const data = {
    id: id
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/get_comment', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(setComments(response.data.data))
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function setComments(data){
return {
  type: SET_COMMENTS,
  commentsInfo: data
}
}
export function userSparkleInflux (email) {
  const data = {
    email: email
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/get_user_sparkle', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(userInfluxSuccess(response.data.data))
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function userInfluxSuccess (data) {
  return {
    type: USER_INFLUX_SUCCESS,
    userSparkleList: data,
  }
}
export function sendSparkle (data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/new_sparkle', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨Successfully saved as a draft✨');
          dispatch(sparkleIdStore(response.data.id))
        } else if (response.data.code === 104) {
          message.error('Please login first')
        } else if (response.data.code === 201){
          message.warning('Lets find a another spot to voice yourself');
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
function sparkleIdStore(id){
  return {
    type: STORE_SPARKLE_ID,
    id: id,
  }
}
export function sendComments (data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/new_comment', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨SUCCESS✨');
          dispatch(getComments(data.id))
        } else if (response.data.code === 104) {
          message.error('Please login first')
        } else  {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function sparkleDelete (id) {
  if (confirm("You are deleting a project.")){
    const data = {
      "id": id,
    }
    return function (dispatch) {
      return axios
        .post('/api/bouquet/delete', data)
        .then(response => {
          if (response.data.code === 0) {
            message.success('Project Deleted');
            window.location.replace("/explore")
          } else {}
          dispatch()
        })
        .catch(() => {
        })
        .finally(() => {
        })
    }
  }
}
export function setAnonymous (id, anonymous){

  const data = {
    "id": id,
    "anonymous": anonymous
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/anonymous', data)
      .then(response => {
        if (response.data.code === 0) {
          if(anonymous==true){
            // Toast.show({
            //   intent: 'success',
            //   message: 'anonymous'
            // })
            message.success('Set to anonymous');
          }
          else{
            // Toast.show({
            //   intent:'danger',
            //   message:'public'

            // })
            message.success('Set to public');
          }
        
        } else {}
      })
      .catch(() => {
      })
      .finally(() => {
      })
}}
export function standFor(id){
  const data = {
    id: id
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/sparkle_stand_by', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨SUCCESS✨');
          dispatch(getSparkleInfo(id))
          return(SUCCESS);
        } else if (response.data.code === 104) {
          message.error('Please login first')
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
export function standAgainst(id){
  const data = {
    id: id
  }
  const message = "你将要举报这一个Sparkle。你确定这样做吗？\n Are you sure the content displayed on this Sparkle is unhealthy?";
  const response = confirm(message);
  if (response) {
    return function (dispatch) {
      return axios
        .post('/api/bouquet/sparkle_stand_against', data)
        .then(response => {
          if (response.data.code === 0) {
            message.success('We appreciate your help to build a healthy community together');
          } else if (response.data.code === 104) {
            message.error('Please login first')
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
}
export function newField(data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/new_field', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨SUCCESS✨');
        } else  {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function newChapter(data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/new_chapter', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨SUCCESS✨');
        } else  {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function ban(id){
  if (confirm("管理员你好，你正要BAN一个Sparkle。")){
    const data = {
      "id": id,
    }
    return function (dispatch) {
      return axios
        .post('/api/bouquet/ban', data)
        .then(response => {
          if (response.data.code === 0) {
            // Toast.show({
            //   intent: 'success',
            //   message: 'Sparkle deleted'
            // })
            message.success('封禁成功');
          } else {}
        })
        .catch(() => {
        })
        .finally(() => {
        })
    }
  }
}
export function comment_delete(id){
  const data = {
    id: id
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/delete_comment', data)
      .then(response => {
        generalResponse(response)
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function comment_edit(data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/edit_comment', data)
      .then(response => {
        generalResponse(response)
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function commentReply_delete(id){
  const data = {
    id: id
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/delete_commentReply', data)
      .then(response => {
        generalResponse(response)
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function commentReply_edit(data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/edit_commentReply', data)
      .then(response => {
        generalResponse(response)
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function comment_reply(data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/new_commentreply', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨SUCCESS✨');
          dispatch(getComments(data.id))
        } else  {
          message.error('Something went wrong...');
        }

      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function comment_getDetails(id){
  const data = { id: id }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/get_commentreply', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(setCommentDetails(response.data.data))
        } else  {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
function setCommentDetails(data){
  return {
    type: SET_COMMENT_DETAILS,
    commentDetails: data,
  }
}
export function sparkle_edit(data){
  return function (dispatch) {
    return axios
      .post('/api/bouquet/edit_sparkle', data)
      .then(response => {
        if (response.data.code === 0) {
          message.success('✨SUCCESS✨');
          dispatch(getSparkleInfo(data.id))
        } else  {
          message.error('Something went wrong...');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function clearData(){
  return {
    type: INFLUX_CLEAR
  }
}
export function postLocation(data){
  
  return {
    type: LOCATED,
    location: data
  }
}
function generalResponse(response){
  if (response.data.code === 0) {
    message.success('✨SUCCESS✨');
  } else  {
    message.error('Something went wrong...');
  }
}
export function addTags(title) {
  const data = {
    title: title
}
  return function (dispatch) {
    return axios
      .post('/api/bouquet/tag_add', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(storeTags(response.data.data))
          message.success('✨SUCCESS✨');
        } else if (response.data.code === 401){
          const msg = "";
          message.info(title + ' already exists as one of our tags');
        }
      })
      .catch(() => {
      })
      .finally(() => {
      })
}
}
export function getTags() {
  return function (dispatch) {
    return axios
      .post('/api/bouquet/tag_fetch')
      .then(response => {
        if (response.data.code === 0) {
          dispatch(storeTags(response.data.data))
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
}
}
function storeTags(data){
return {
  type: STORE_TAGS,
  tags: data
}
}
export function getTagSparkle(data) {
  return function (dispatch) {
    return axios
      .post('/api/bouquet/subject_sparkle', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(influxSuccess(response.data.data))
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function sparkleFilter(data) {
  return function (dispatch) {
    return axios
      .post('/api/bouquet/sparkle_filter', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(influxSuccess(response.data.data))
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function getHomeSparkles(data) {
  return function (dispatch) {
    return axios
      .post('/api/bouquet/get_homeSparkles')
      .then(response => {
        if (response.data.code === 0) {
          dispatch(influxSuccess(response.data.data))
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
  }
}
export function members_setting(data) {
  console.log("A!");
  return function (dispatch) {
    return axios
      .post('/api/bouquet/members_setting', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(storeTags(response.data.data))
          message.success('✨SUCCESS✨');
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
}
}
export function members_fetch(id) {
  const data = {
    id: id
  }
  return function (dispatch) {
    return axios
      .post('/api/bouquet/members_fetch', data)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(saveMembersInfo(response.data.data))
        } 
      })
      .catch(() => {
      })
      .finally(() => {
      })
}
}
function saveMembersInfo(data){
return {
  type: SAVE_SPARKLE_MEMBERSINFO,
  data: data
}
}
