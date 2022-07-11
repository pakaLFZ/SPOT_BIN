import React, {
    useState,
} from 'react'

import {
    withRouter,
    useHistory
} from 'react-router-dom'

import {
    Button,
    Popover,
    Card,
    Avatar,
    Typography,
    Space
} from "antd"

import {
    ban
} from 'actions/sparkle'

import styles from "./card.less"

import {
    avatarLink
} from "component/config/general.jsx"

import {
    LikeFilled,
    UserOutlined 
} from '@ant-design/icons';
import {
    ShowSubjects
} from "component/Tags/subject.jsx";
import {
    ShowLocation
} from "component/Tags/locationTag.jsx";
import {
    ShowAgeGroups
} from "component/Tags/ageGroup.jsx";
import { useDispatch } from 'react-redux'
import {
    email2url
} from "component/tools/general.jsx"

const { Paragraph } = Typography;

export default withRouter(Page)

function Page(props){
    const data = props.data;
    const history = useHistory()
    const dispatch = useDispatch();
    const ellipsis = true;
    function relocate(){
        const email = email2url(data.email)
        history.push("/user/" + email)
    }

    return (
        <Card 
            hoverable
            bordered
            onClick={()=>relocate()}
        >
            <Cover data={data.avatar}/>
            <div className={styles.content} >
                <Paragraph 
                    ellipsis={
                        ellipsis ? { rows: 3, expandable: true, symbol: ' ' } : false
                    }
                    className={styles.title}
                > 
                {data.username}
                </Paragraph>
                <div >
                <Space wrap >
                    <ShowSubjects subjects={data.subjects} small lock shrink/>
                    <ShowLocation location={data.location} small lock/>
                    <ShowAgeGroups ageGroups={data.ageGroups} lock shrink/>

                </Space>
                </div>
            </div>

            <div className={styles.description}>
                <h3>Bio</h3>
                <Paragraph 
                    ellipsis={
                        ellipsis ? { rows: 5, expandable: true, symbol: 'more' } : false
                    }
                > 
                    {data.bio}
                </Paragraph>

            </div>
        </Card>
    )
}

function Cover(props){
    const avatar = props.data;
    return (
        <div className={styles.cover}>
            <Avatar
                size={120}
                icon={<UserOutlined />}
                src={
                    avatar?
                    <img src={avatarLink + avatar}/>
                    : null
                }
                shape="circle"
                className={styles.avatar}
            />
        </div>
    )
}
