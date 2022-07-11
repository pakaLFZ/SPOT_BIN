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
    Button,
    Typography,
} from "antd"

import {
    ban
} from 'actions/sparkle'

import {
    requestSubjectList,
} from 'actions/tags'

import styles from "./card.less"

import {
    postLink
} from "component/config/general.jsx"

import {
    LikeFilled,
    LikeOutlined,
    EyeOutlined
} from '@ant-design/icons';

const { Paragraph } = Typography;

export default withRouter(Page)

function Page(props){
    const data = props.data;
    const history = useHistory()
    const dispatch = useDispatch();
    const ellipsis = true;
    function relocate(){
        history.push("/explore/" + data.id)
    }
    function BanButton(){
        return(
            <Button 
                onClick={()=>dispatch(ban(data.id))}
                shape="circle"
                danger
            >
                BAN
            </Button>
        )
    }
    return (
        <div
            className={styles.container}
            onClick={()=>relocate()}
        >
            <ColorLine tags={data.subjects}/>
            <Cover data={data.cover}/>
            <div className={styles.content} >
                <Paragraph 
                    ellipsis={
                        ellipsis ? { rows: 3, expandable: true, symbol: ' ' } : false
                    }
                    className={styles.title}
                > 
                    {data.title}
                </Paragraph>
                <div >
                    <Tags data={data.subjects}/>
                    <LocationTags data={data.location}/>
                    <Tags data={data.ageGroups}/>
                    <p>
                        <span><EyeOutlined />&nbsp;{data.viewCount}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                            {
                                data.liked ?
                                <LikeFilled style={{color:"#2775cf"}}/>
                                : <LikeOutlined style={{color:"#2775cf"}}/>
                            }
                            &nbsp;{data.like}
                        </span>
                    </p>
                </div>
            </div>

            <div className={styles.description}>
                <h3>Mission Statement</h3>
                <div>
                    <Paragraph 
                        ellipsis={
                            ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false
                        }
                    > 
                        {data.mission}
                    </Paragraph>
                </div>

            </div>
        </div>
    )
}

function Tags(props){
    const data = props.data;
    let data_ = data;
    if (data.length >=3 ){
        data_ = data.slice(0, 2);
    }
    return (
        <div className={styles.tags}>
             <p>
                {
                    data_.map(
                        (item, id)=> (
                            <span key={id} >
                                {item};&nbsp;
                            </span>
                        )
                    )
                }
                {
                    data.length > 2?
                    "..."
                    : null
                }
            </p>
           
        </div>
    )
}

function LocationTags(props){
    const location = props.data;
    return (
        <div className={styles.tags}>
            <p>
                <span>{location.country} ;&nbsp;</span>
                <span>{location.province} ;&nbsp;</span>
                <span>{location.city} ;&nbsp;</span>
            </p>
        </div>
    )
}

function Cover(props){
    const cover = props.data;
    return (
        <div className={styles.cover}>
            <img 
                src={postLink + cover} 
            />
        </div>
    )
}

function ColorLine(props){
    const dispatch = useDispatch();
    const height = 190;
    const width = "20px";
    const tags = props.tags;
    const { subjects } = useSelector(state => state.tags);
    if (!subjects){
        dispatch(requestSubjectList());
        return (<></>)
    }

    else if (tags.length == 0){
        return (<></>)
    } 
    
    else if (tags.length == 1) {
        const colorId = getValue(tags[0], subjects);
        const style = {
            backgroundColor: ranColor(colorId)
        }
        return (
            <div 
                className={styles.colorBorder}
                style={style}
            >
    
            </div>
        )
    }

    else if (tags.length == 2) {
        const colorId1 = getValue(tags[0], subjects);
        const colorId2 = getValue(tags[1], subjects);

        const style1 = {
            height: height / 2 + "px",
            width: width,
            backgroundColor: ranColor(colorId1)
        }
        const style2 = {
            height: height / 2 + "px",
            width: width,
            backgroundColor: ranColor(colorId2)
        }
        return (
            <div className={styles.colorBorder}>
                <div style={style1}/>
                <div style={style2}/>
            </div>
        )
    }

    else if (tags.length > 2) {
        const colorId1 = getValue(tags[0], subjects);
        const colorId2 = getValue(tags[1], subjects);
        const colorId3 = getValue(tags[2], subjects);
        const style1 = {
            height: height / 3 + "px",
            width: width,
            backgroundColor: ranColor(colorId1)
        }
        const style2 = {
            height: height / 3 + "px",
            width: width,
            backgroundColor: ranColor(colorId2)
        }
        const style3 = {
            height: height / 3 + "px",
            width: width,
            backgroundColor: ranColor(colorId3)
        }
        
        return (
            <div className={styles.colorBorder}>
                <div style={style1}/>
                <div style={style2}/>
                <div style={style3}/>
            </div>
        )
    }
}





function ranColor(number){
    let r = Math.floor(rand(number )*256);
	let g = Math.floor(rand(number * 32)*256);
	let b = Math.floor(rand(number * 103 )*256);
	let rgb = 'rgb('+r+','+g+','+b+')';
	return rgb;
}

function rand( seed ){
    //随机数生成
    seed = ( seed * 9301 + 49297 ) % 233280; //为何使用这三个数?
    return seed / ( 233280.0 );
};

function getValue(title, list) {  
    //通过一个属性，找到对象里的另一个属性
    //https://segmentfault.com/q/1010000014891530
    var filterArray = list.filter(function(v) {
        return v.title === title
    })
    if (filterArray.length) {
        return filterArray[0].id
    }
}