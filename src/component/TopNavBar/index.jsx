import React, {
  useState
} from 'react'

import {
  useDispatch,  //发送请求
  useSelector   //获得数据
} from 'react-redux' // 发送请求的

import {
  Space,
  message,
  Button,
} from "antd"

import {
  FormOutlined,
  TeamOutlined
} from "@ant-design/icons"

import {
  withRouter,
  useHistory
} from 'react-router-dom'

import {
  getUserInfo,
} from 'actions/user'

import styles from "./index.less";

import {
  spotLogoLink
} from "component/config/general.jsx"
import { email2url } from "component/tools/general.jsx"


export default withRouter(TopNavBar)
function TopNavBar(props){
  const history = useHistory()
  const dispatch = useDispatch();

  const blue = props.blue;

  const [ f, sf ] = useState(true);
  const {
    user,
  } = useSelector(state => state.user);

  function clickPost(){
    if (user) history.push("/post")
    else {
      history.push("/auth")
      message.warning('Please login first 😉');
    }
  }
  function redirect2User(){
    if(user){
      const url = "/user/" + email2url(user.email)
      history.push(url)
    }
  }
  if (f){
    dispatch(getUserInfo())
    sf(false);
  }
  return(
    <div className={styles.mainContainer}>
      <img 
        onClick={()=>history.push("/")}
        className={styles.spotLogo} 
        src={spotLogoLink}
      />

      <div className={styles.title}>
        <Space wrap>
          <Button
            type="text"
            onClick={()=>history.push("/") }
            size="large"
          >
            HOME
          </Button>
          <Button
            type="text"
            onClick={()=>history.push("/explore") }
            size="large"
          >
            EXPLORE
          </Button>

          <Button 
            onClick={()=>history.push("/network")}
            size="large"
            type="text"
          >
            PEOPLE
          </Button>

          <Button 
            onClick={()=>history.push("/about")}
            size="large"
            type="text"
          >
            ABOUT
          </Button>
          
        </Space>
      </div>
      <div className={styles.userTitle}>
        <Space wrap>
          <Button 
            onClick={()=>clickPost()}
            size="large"
            type="text"
          >
            POST
          </Button>
          {
            props.back?
            <Button 
              type="text"
              onClick={()=>history.push("/")}
              size="large"
            >
              BACK
            </Button> :
              user?
              <Button 
                onClick={()=>redirect2User()} 
                size="large"
                type="text"
              >
                {user.username}
              </Button>
              :
              <Button 
                onClick={()=>history.push("/auth")}
                size="large"
                type="text"
              >
                LOGIN
              </Button>
          }
        </Space>
      </div>
    </div>
  )
}