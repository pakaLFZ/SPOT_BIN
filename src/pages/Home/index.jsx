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
    userFilter
} from 'actions/user'

import {
    Input,
    Modal,
    Divider,
    Button,
    Space
} from "antd"

import {
    FilterOutlined
} from '@ant-design/icons';

import {
    spotLogoLink
} from "component/config/general.jsx"

import Footer from "component/Footer/index.jsx"
import TopNavBar from 'component/TopNavBar'
import styles from "./index.less"

export default withRouter(Page)
function Page(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [style, setStyle] = useState(false);
    const [ranNum, setRanNum] = useState(0);
    const backgroundImg = "http://www.spotaproject.com/files/lib/home-background.png"
    
    const circleWidth = screen.availWidth * 0.8
    return (
        <div>
            <div 
                className={styles.top} 
                style={{
                    backgroundImage: `url("` + backgroundImg + `")` ,
                    backgroundSize: "1200px"
                }}
            >
                <div className={styles.white}>
                    <img
                        src={spotLogoLink}
                        className={styles.logo}
                        style={
                            style ?
                                {
                                    filter: "hue-rotate(" + ranNum + "deg) saturate(150%)",
                                    // transform: "scale(1.01)",
                                    transition: "0.2s"
                                } :
                                {}
                        }
                        onMouseEnter={() => setStyle(true)}
                        onTouchStart={() => setStyle(true)}
                        onMouseMove={() => setRanNum(randomNum(0, 180))}
                        onTouchMove={() => setRanNum(randomNum(0, 180))}
                        onMouseLeave={() => setStyle(false)}
                        onTouchEnd={() => setStyle(false)}
                    />
                    <p />
                    <br />

                    <p>
                    Explore projects organized by students next to you, and visit those that are far from you
                    </p>
                    <br/>

                    <Button
                        onClick={()=>history.push("/explore")}
                        type="primary"
                        shape="round"
                        size="large"
                    >
                        Start to Explore
                    </Button>
                    <p/>
                    <Button
                        onClick={()=>history.push("/auth")}
                        shape="round"
                        type="text"
                    >
                        Login / Signup
                    </Button>
                    <p/>
                    <br/>
                    <br/>
                    
                    </div>
               </div>

            <Footer />

        </div>
    )
}



function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
} 