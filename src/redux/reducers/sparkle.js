import {
    INFLUX_SUCCESS,
    GAINED_SPARKLE_CONTENT,
    USER_INFLUX_SUCCESS,
    INFLUX_CLEAR,
    LOCATED,
    SET_CHAPTER,
    SET_FIELD,
    SETCHAPTERINFO,
    SET_COMMENTS,
    SET_COMMENT_DETAILS,
    STORE_TAGS,
    STORE_SPARKLE_ID,
    SAVE_SPARKLE_SEARCH,
    SAVE_SPARKLE_MEMBERSINFO
  } from 'actions/sparkle'
  
  const initState = {
    sparkleList: null,
    sparkleInfo: {
      id: null,
      content: null
    },
    userSparkleList: null,
    sparkleList_used: true,
    location_C: null,
    chapter: null,
    field: null,
    chapterInfo: null,
    commentsInfo: null,
    commentDetails: null,
    tags: [],
    memberInfo: null,
  }
  
  export default function reducer (state = initState, action) {
    switch (action.type) {
    // --------paper
      case INFLUX_SUCCESS:
        // console.log("influxed");
        return {
          ...state,
          sparkleList: action.sparkleList
        }
      case INFLUX_CLEAR:
        // console.log("cleared");
        return {
          ...state,
          sparkleList: null,
        }
      case STORE_SPARKLE_ID:
        return {
          ...state,
          sparkleInfo: {
            id: action.id,
            content: null
          }
        }
      case USER_INFLUX_SUCCESS:
        return {
          ...state,
          userSparkleList: action.userSparkleList,
          sparkleList_used: false
        }
      case LOCATED:
        return {
          ...state,
          location_C: action.location,
        }
      case SET_FIELD:
        return {
          ...state,
          field: action.field
        }
      case SET_CHAPTER:
        return {
          ...state,
          chapter: action.chapter
        }
      case GAINED_SPARKLE_CONTENT:
        return {
          ...state,
          sparkleInfo: action.sparkleInfo
        }
      case SETCHAPTERINFO:
        return {
          ...state,
          chapterInfo: action.chapterInfo
        }
      case SET_COMMENTS:
        return {
          ...state,
          commentsInfo: action.commentsInfo
        }
      case SET_COMMENT_DETAILS:
        return {
          ...state,
          commentDetails: action.commentDetails
        }
      case STORE_TAGS:
        return {
          ...state,
          tags: action.tags
        }
      case SAVE_SPARKLE_SEARCH:
        return {
          ...state,
          sparkleList: action.data
        }
      case SAVE_SPARKLE_MEMBERSINFO:
        return {
          ...state,
          memberInfo: action.data
        }
      default: 
        return {
        ...state
        }
    }
  }
  