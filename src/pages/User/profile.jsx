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
import TopNavBar from '../../component/TopNavBar/index';

import {
    avatarLink
} from "component/config/general.jsx";
import Loading from 'component/Loading/index';
import UserProfile from "component/UserProfile/profile.jsx";


const { Text } = Typography;

export default withRouter(Profile)
function Profile(props){
    const dispatch = useDispatch();
    const { 
        user
    } = useSelector(state => state.user);
    
    if (user == null) return <Loading/>
    else return <UserProfile email={user.email}/>
}