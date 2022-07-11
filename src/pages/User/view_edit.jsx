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
    editPersonalInfo
} from 'actions/user'

import {
    Button,
    Divider,
    Typography,
    Space,
    Tooltip,
    Comment,
    Input,
    Avatar,
    Modal,
    Card
} from "antd"

import {
    DeleteOutlined,
    EditOutlined,
    SendOutlined,
    HeartOutlined,
    ShareAltOutlined,
    UserOutlined
} from '@ant-design/icons';

import {
    qrCodeLink,
    avatarLink
} from "component/config/general";

import Upload from "component/Upload/Button"
import TopNavBar from 'component/TopNavBar'
import Loading from 'component/Loading/index.jsx'
import UserProfile from "component/UserProfile/profile.jsx";
import Footer from "component/Footer/index.jsx"
import {
    SearchLocation,
} from "component/Tags/locationTag.jsx"
import {
    SelectSubjects,
} from "component/Tags/subject.jsx"
import {
    SelectAgeGroups,
} from "component/Tags/ageGroup.jsx"

import { ZH, EN } from "component/config/language"

import styles from "./view.less"

import {
    url2email
} from "component/tools/general.jsx"


const { Title, Paragraph, Text, Link } = Typography;


export default withRouter(Page)
function Page(props){
    const { email_L } = props.match.params;
    const email_Link = url2email(email_L)
    const { 
        user_else,
    } = useSelector(state => state.user);
    const user = user_else;
    const dispatch = useDispatch();
    const history = useHistory()
    const [ f, sf ] = useState(true);
    
    if (f){
        dispatch(getUserData(email_Link))
        sf(false);
    }
    if (!user){
        return (
            <div>
                <Loading/>
                <TopNavBar blue/>
            </div>
        )
    } else if (user.email != email_Link) {
        return (
            <div>
                <Loading/>
                <TopNavBar blue/>
            </div>
        )
    } else if (!user.yours) {
        const url = "/user/" + email_L;
        window.location.replace(url)
    } else {
        return (
            <EditPage 
                user={user} 
                email_L={email_L}
                history={history}
            />
        )
    }
}

function EditPage(props){
    const user = props.user;
    const email_L = props.email_L;
    const history = props.history;
    const email_Link = url2email(email_L);
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState(user.username)
    const [ school, setSchool ] = useState(user.school)
    const [ bio, setBio ] = useState(user.bio)
    const [ edited, setEdited ] = useState(false);
    const [ tagList, setTagList ] = useState(user.subjects);
    const [ ageGroups, setAgeGroups ] = useState(user.ageGroups)
    const [ fileList, setFileList ] = useState([]);
    const [ location, setLocation ] = useState(user.location)
    function requestSparkleFilter(data, type){
        if(type=="subjects"){
            setTagList(data)
        } else if(type=="location"){
            setLocation(data)
        } else if(type=="ageGroups"){
            setAgeGroups(data)
        }
        setEdited(true)
    }
    function updateUserAvatar(fileList){
        dispatch(getUserData(email_Link))
        setFileList(fileList)
    }
    function back(){
        let action = true;
        if (edited) {
            action = confirm("Are you sure you want to quit? Remember to save your data.\n 你确定要退出修改界面吗？记得保存你的修改。")

        }
        if (action){
            const url = "/user/" + email_L;
            history.push(url)
        } 
    }
    function requestSaveData(){
        const requestData = {
            userName: username,
            school: school,
            bio: bio,
            subjects: tagList,
            ageGroups: ageGroups,
            location: location
        }
        dispatch(editPersonalInfo(requestData))
    }

    return(
        <div className={styles.mainContainer}>
            <TopNavBar/>
            
            <div className={styles.content}>
                <Button  
                    onClick={()=>back()} 
                >
                    Back
                </Button>
                <div className={styles.basicInfo}>
                <Upload
                    setFileList={(e)=>updateUserAvatar(fileList)}
                    fileList={fileList}
                    actionType="avatar"
                    buttonName="上传头像 Upload"
                >
                    <Tooltip title={"Click to edit"} placement="top">
                        <Avatar
                            icon = {<UserOutlined/>}
                            size = {150}
                            shape = "circle"
                            src={
                                user.avatar?
                                <img src={avatarLink + user.avatar}/>
                                : null
                            }
                        />
                    </Tooltip>
                </Upload>

                <p/>
                <Title 
                    level={2}
                    editable={{
                        icon: <EditOutlined />,
                        tooltip: 'Edit',
                        onChange: (e)=>setUsername(e),
                        onStart: ()=>setEdited(true)
                    }}
                >
                    {username}
                </Title>
                     
                </div>

                <p/>
                <br/>

                <h2>Select Location</h2>
                <SearchLocation 
                    details
                    location={location}
                    onChange={(e)=>requestSparkleFilter(e, "location")}
                />
                <p/>
                <br/>

                <h2>Select Subjects</h2>
                <SelectSubjects 
                    tagList={tagList} 
                    setTagList={(e)=>requestSparkleFilter(e, "subjects")}
                />
                <p/>
                <br/>

                <h2>Select Age Group</h2>
                <SelectAgeGroups 
                    single
                    tagList={ageGroups} 
                    onChange={(e)=>requestSparkleFilter(e, "ageGroups")}
                />
                <p/>
                <br/>

                <h2>School</h2>
                <Text 
                    editable={{
                        icon: <EditOutlined />,
                        tooltip: 'Edit',
                        onChange: (e)=>setSchool(e),
                        onStart: ()=>setEdited(true)
                        // onEnd: ()=>savePersonalInfo()
                    }}
                >
                    {school}
                </Text>

                <p/>
                <br/>
                
                <Divider/>
                <h2>Email</h2>
                <Paragraph copyable>{user.email}</Paragraph>
                <p/>
                <br/>

                <h2>Bio</h2>
                <Text 
                    editable={{
                        icon: <EditOutlined />,
                        tooltip: 'Edit',
                        onChange: (e)=>setBio(e),
                        onStart: ()=>setEdited(true)
                        // onEnd: ()=>savePersonalInfo()
                    }}
                    >
                        {bio}
                </Text> 

                <p/>
                <br/>
                <Button 
                    disabled={!edited}
                    onClick={()=>requestSaveData()}
                    type="primary"

                >
                    save
                </Button>

                

      
                <br/>
                <br/>
                <br/>

            </div>
        <Footer/>
      
          
        </div>
    )
}

