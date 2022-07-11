import React, {
    useState,
} from 'react'

import {
    withRouter,
} from 'react-router-dom'

import {
    useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的

import People from 'component/Network/card.jsx'
import styles from "./index.less"

export default withRouter(Page)
function Page(props){
    const userList = props.userList;


    if (!userList) return <p>Nothing here!</p>
    else if (userList.length == 0) return (<p>Empty!?</p>)
    else return (
        <div className={styles.mainContainer}>            
            <div className={styles.flex}>
                {
                    userList.map(
                        (item, id) => (
                            <div className={styles.item} key={id}>
                                <People data={item}/>
                            </div>
                        ) 
                    )
                }
            </div>
        </div>
    )
}

