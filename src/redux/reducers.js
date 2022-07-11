import { combineReducers } from 'redux'

import user from 'reducers/user'
import sparkle from 'reducers/sparkle'
import zoom from 'reducers/zoom'
import chat from 'reducers/chat'
import databank from 'reducers/databank'
import tags from 'reducers/tags'




export default combineReducers({
  user,
  sparkle,
  zoom,
  chat,
  databank,
  tags
})
