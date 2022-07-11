// Dispatch --> 皮球
// Reducer --> 帮助react发信号(action) + 储存信号反馈信息(reducer)
// dispatch 跨文件发信号


// import { message } from "antd";

const axios = require('axios')

export const SAVELINK = 'zoom/SAVELINK'
//User Info



// Logout
export function getLink () {
    return function (dispatch) {
        return axios
        .post('/api/zoom/getlink')
        .then(response => {
            if (response.data.code == 0) {
            dispatch(saveLink(response.data.link))
            } 
        })
        .catch(() => {
            message.error('Something went wrong...😷');
        })
    }
}
function saveLink (link) {
    return {
      type: SAVELINK,
      link: link
    }
  }

