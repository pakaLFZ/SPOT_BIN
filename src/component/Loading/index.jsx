import React from 'react'
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons'
import styles from "./index.less"

export default function Loading(){
    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
    return (
        <Spin indicator={antIcon} className={styles.loading}/>
    )
}