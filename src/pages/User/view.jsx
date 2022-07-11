import React, {
    useState,
} from 'react'

import {
    withRouter,
    useHistory
} from 'react-router-dom'

import {
    useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的


import {
    getUserData,
    logout
} from 'actions/user'

import {
    Button,
    Divider,
    Typography,
    Avatar,
    Space,
    Tooltip
} from "antd"

import {
    DeleteOutlined,
    EditOutlined,
    SendOutlined,
    HeartOutlined,
    BulbOutlined,
    UserOutlined
} from '@ant-design/icons';

import {
    qrCodeLink,
    avatarLink
} from "component/config/general";


import TopNavBar from 'component/TopNavBar'
import Loading from 'component/Loading/index.jsx'
import Footer from "component/Footer/index.jsx"
import Posts from "./posts.jsx"
import {
    ShowLocation
} from "component/Tags/locationTag.jsx"
import {
    ShowSubjects
} from "component/Tags/subject.jsx"
import {
    ShowAgeGroups
} from "component/Tags/ageGroup.jsx"

import { ZH, EN } from "component/config/language"

import styles from "./view.less"

import { url2email } from "component/tools/general.jsx"

const { Title, Paragraph, Text, Link } = Typography;


export default withRouter(Page)
function Page(props){
    const { email_L } = props.match.params;
    const email_Link = url2email(email_L)
    const { user_else } = useSelector(state => state.user);
    const history = useHistory()
    const dispatch = useDispatch();

    const [ f, sf ] = useState(true);
    function editRequest(){
        const url = "/user/" + email_L + "/edit"
        history.push(url)
    }
    

    if (f){
        dispatch(getUserData(email_Link))
        sf(false);
    }
    if (!user_else){
        return (
            <div>
                <Loading/>
                <TopNavBar blue/>
            </div>
        )
    } else if (user_else.email != email_Link) {
        return (
            <div>
                <Loading/>
                <TopNavBar blue/>
            </div>
        )
    } else {
        return(
            <div className={styles.mainContainer}>
                <TopNavBar/>
                <div className={styles.content}>
                    <div className={styles.basicInfo}>
                        <Avatar
                            size={150}
                            icon={<UserOutlined />}
                            src={
                                user_else.avatar?
                                <img src={avatarLink + user_else.avatar}/>
                                : null
                            }
                            shape="circle"
                        />

                        <p/>
                        <Title level={2} >
                            {user_else.username}
                        </Title>
                        <p/>

                        <Title level={3} >
                            {user_else.school}
                        </Title>

                        <ShowAgeGroups ageGroups={user_else.ageGroups}  lock/> 
                        <p/>
                        <br/>
                        
                        <ShowSubjects subjects={user_else.subjects}   lock />
                        <p/>

                        <ShowLocation location={user_else.location}  lock details/>
                        <p/>
                    </div>
                    <p/>
                    <br/>
                    {
                        user_else.yours?
                        <Space>
                            <Button  
                                onClick={()=>dispatch(logout())} 
                            >
                                Log out
                            </Button>
                            <Button  
                                onClick={()=>editRequest()} 
                                icon={<EditOutlined/>}
                            >
                                Edit
                            </Button>
                           <Tooltip title="Lets go post one of your meaningful project!">
                            <Button  
                                    onClick={()=>history.push("/post")} 
                                    type="primary"
                                    shape="round"
                                    icon={<BulbOutlined />}
                                >
                                    Post a Project
                                </Button>
                           </Tooltip>
                        </Space>
                        
                    : null
                    }

                    <Divider/>
                    <h2>Email</h2>
                    <Paragraph copyable>{user_else.email}</Paragraph>
                    <p/>
                    <br/>

                    <h2>Bio</h2>
                    <p>{user_else.bio}</p>

                    <Divider/>
                    <h2>Projects</h2>
                    <Posts email={email_Link}/>

          
                    <br/>
                    <br/>
                    <br/>

                </div>
            <Footer/>
            </div>
        )
    }
}


