import React from 'react'

  import {
    withRouter,
  } from 'react-router-dom'

  import {
    Divider
} from "antd"
  
  import styles from "./index.less";
  
  export default withRouter(Page)

  function Page(props){
    return (
        <div className={styles.mainContaienr}>
            <div className={styles.content}>
                <Divider style={{color: "white"}}/>
                {/* <p>
                    Guidance on using our platform:{" "}
                    <a
                    href="  https://www.bilibili.com/video/BV1oT4y1f7nb?share_source=copy_web"
                    target
                    >
                    Link
                    </a>
                </p> */}
                <p>
                    Contact us: <u>pakaLFZ@gmail.com</u>
                </p>
                <p style={{ textAlign: "center" }}>Designed &amp; Powerd by SPOT </p>
                <p style={{ textAlign: "center" }}>Copyright© 2022</p>
                <br/>
                </div>
        </div>
    )
  }

