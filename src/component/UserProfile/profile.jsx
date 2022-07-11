import React, {
    useState,
    useEffect
} from 'react'

import {
    withRouter,
    useHistory
} from 'react-router-dom'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import {
    editPersonalInfo,
    getUserData,
    logout
} from 'actions/user'

import { 
    Avatar,
    Typography,
    Tooltip,
    Button,
    Divider,
    List,
    Space
} from 'antd';

import { 
    UserOutlined,
    EditOutlined,
} from '@ant-design/icons';

import Upload from "component/Upload/Button"
import styles from "./profile.less"

import {
    avatarLink
} from "component/config/general.jsx";
import Loading from 'component/Loading/index';

const { Text } = Typography;

export default withRouter(Profile)
function Profile(props){
    const dispatch = useDispatch();
    const email = props.email;
    const { user_else } = useSelector(state => state.user);

    const [f, sf ] = useState(true)

    if (f) {
        dispatch(getUserData(email))
        sf(false)
    }
    if (user_else==null || user_else.email != email) { return <Loading/> }
    else { return <Content user={user_else}/> }
}


function Content(props){
    const dispatch = useDispatch();
    const user = props.user;
    const [ fileList, setFileList ] = useState([]);
    const [ username, setUsername ] = useState(user.username)
    const [ school, setSchool ] = useState(user.school)
    const [ location, setLocation ] = useState(user.location)
    const [ bio, setBio ] = useState(user.bio)
    const [ edited, setEdited ] = useState(false);


    function ListContent(props){
        const type = props.type;
        if (type=="avatar") {
            return (
                <>
                {
                    user.yours ?
                    <Upload
                        setFileList={(e)=>setFileList(e)}
                        fileList={fileList}
                        actionType="avatar"
                        buttonName="上传头像 Upload"
                    >
                        <Tooltip title={"Click to edit"} placement="top">
                            <Avatar
                                icon = {<AvatarImg avatar={user.avatar}/>}
                                size = {60}
                                shape = "circle"
                            />
                        </Tooltip>
                    </Upload>
                    :
                    <Avatar
                        icon = {<AvatarImg avatar={user.avatar}/>}
                        size = {60}
                        shape = "circle"
                    />
                }
                </>
            )
        }
        if (type=="username") {
            return (
                <>
                {
                    user.yours ?
                    <Text 
                        editable={{
                            icon: <EditOutlined />,
                            tooltip: 'Edit',
                            onChange: (e)=>setUsername(e),
                            onStart: ()=>setEdited(true)
                            // onEnd: ()=>savePersonalInfo()
                        }}
                    >
                        {username}
                    </Text>
                    :
                    <Text>
                        {username}
                    </Text>
                }
                </>
                
            )
        }
        if (type=="email") {
            return (
                <Text copyable >
                    {user.email}
                </Text>
            )
        }
        if (type=="school") {
            return (
                <>
                {
                    user.yours ?
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
                    :
                    <Text>
                        {school}
                    </Text>
                }
                </>
                
            )
        }
        if (type=="location") {
            return (
                <>
                {
                    user.yours ?
                    <Text 
                        editable={{
                            icon: <EditOutlined />,
                            tooltip: 'Edit',
                            onChange: (e)=>setLocation(e),
                            onStart: ()=>setEdited(true)
                            // onEnd: ()=>savePersonalInfo()
                        }}
                        >
                            {location}
                    </Text> 
                    :
                    <Text>
                        {location}
                    </Text>
                }
                </>
                
            )
        }
        if (type=="bio") {
            return (
                <>
                {
                    user.yours ?
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
                    :
                    <Text>
                        {bio}
                    </Text>
                }
                </>
            )
        }

        
    }

    const userInfoList = [
        {
            title: "Profile Picture",
            content: <ListContent type="avatar"/>
        },
        {
            title: "User Name",
            content: <ListContent type="username"/>
        },
        {
            title: "Email",
            content: <ListContent type="email"/>
        },
        {
            title: "School",
            content: <ListContent type="school"/>
        },
        {
            title: "Location",
            content: <ListContent type="location"/>
        }
    ]

    function savePersonalInfo(){
        let username_ = username;
        let school_ = school;
        let location_ = location;
        let bio_ = bio;

        if (username_ instanceof Array) { username_=username_[0] }
        if (school_ instanceof Array) { school_=school_[0] }
        if (location_ instanceof Array) { location_=location_[0] }
        if (bio_ instanceof Array) { bio_=bio_[0] }

        
        const data = {
            userName: username_,
            // email: user.email,
            school: school_,
            location: location_,
            bio: bio_
        }
        dispatch(editPersonalInfo(data))
        setEdited(false)
    }

    if (user == null) return <div className={styles.maincontainer}><Loading/></div> 
    else {
        console.log("user", user);
        return(
          <div className={styles.maincontainer}>
            
           <div>
           <h2>User Information</h2>
            <List
                    dataSource={userInfoList}
                    renderItem={item => (
                        <>
                
                            <List.Item 
                                key={item.id}
                            >
                                <List.Item.Meta
                                    title={<p>{item.title}</p>}
                                />
                                {item.content}
                            </List.Item>
                        
                        </>
                        
                )}
                />
            <h2>Biography</h2>
        
            {
                user.yours?
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
                :
                <Text>{bio}</Text>
            }

            {
                user.yours? 
                <>
                    <Divider orientation="left">
                        Actions
                    </Divider>
                    <Space
                        direction="horizontal"
                        size="small"
                    >
                        <Button
                            onClick={()=>dispatch(logout())}
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={()=>savePersonalInfo()}
                            disabled={!edited}
                            type="primary"
                        >
                            Save
                        </Button>
                    </Space>
                </>
                : null
            }
            

           </div>
          </div>
        )
    }
}

function AvatarImg(props){
    if(props.avatar){
        return(
            <img src={avatarLink + props.avatar} />
        )
    } else {
        return ( <UserOutlined />)
    } 
}