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



import Project from 'component/Explore/card.jsx'
import styles from "./index.less"

export default withRouter(Page)
function Page(props){
    // const dispatch = useDispatch();
    const sparkleList = props.sparkleList;
    // const { sparkleList } = useSelector(state => state.sparkle);


    if (!sparkleList) return <p>Nothing here!</p>
    else if (sparkleList.length == 0) return (<p>Empty!?</p>)
    else return (
        <div className={styles.mainContainer}>            
            <div className={styles.flex}>
                {
                    sparkleList.map(
                        (item, id) => (
                            <div className={styles.item}>
                                <Project data={item} key={id}/>
                            </div>
                        ) 
                    )
                }
            </div>
        </div>
    )
}

