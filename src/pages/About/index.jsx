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
    Card,
    Divider,
    Space
} from "antd"

import {
    sparkleInflux,
    getTagSparkle
} from 'actions/sparkle'

import TopNavBar from 'component/TopNavBar'
import styles from "./index.less"
import Footer from "component/Footer/index.jsx"


export default withRouter(Page)
function Page(props){
 
    return (
        <div className={styles.mainContainer}>
            <TopNavBar/>
            <div className={styles.content}>

                <div className={styles.head}>
                <img 
                    className={styles.bigLogo}
                    src="http://www.spotaproject.com/files/logo/SPOT_Logo_R.png"
                />
                
                    <p className={styles.d1}>
                        <strong>S</strong>tudent &nbsp;
                        <strong>P</strong>rojects &nbsp;
                        <strong>O</strong>rganized &nbsp;
                        <strong>T</strong>ogether &nbsp;
                    </p>
                    <br/>
                    <p className={styles.d2}>Founded in <strong>2021</strong></p>

                </div>    
                <br/>
                <Card hoverable>
                    <div className={styles.mission}>
                        <p>
                            Our mission is to facilitate collaboration between high school students internationally, encouraging like-minded peers to connect and undertake unique initiatives that bring about positive impacts on society.
                        </p>
                    </div>
                </Card>
                <br/>
                <br/>
                <br/>
                <div className={styles.text}>
                    <h2>Our Story</h2>
                    <p>
                        SPOT is an initiative inspired by the revolutionary Design Thinking framework taught by the Stanford e-China course.
                        <br/>
                        <br/>
                        The first step in this process is empathizing, and talking with our teenage peers, it became clear that many were frustrated by the difficulty in running sustainable initiatives. The root cause of this was not only the lack of a team, but also a community of teenagers that are passionate about similar topics. 
                        <br/>
                        <br/>
                        With safety concerns regarding COVID-19 still being a big emphasis here in China, the limited interactions that international schools have with each other went from little to none. Hence, we decided to create this platform, in hopes of creating a community of people and a database of projects so that our generation can leave its mark on the world.
                    </p>
                </div>
                <br/>
                <br/>
                <br/>


                <p className={styles.bigTitle}>Meet Our Contributors</p>
                <br/>
                <Space direction="vertical">
                    <div className={styles.contributor}>
                        <img src="http://www.spotaproject.com/files/lib/Photo_NathanC.png"/>

                        <div className={styles.description}>
                        <h1>Nathan H. Chan</h1>
                        <h3>Cofounder</h3>
                        <br/>
                        <p>
                        Nathan H. Chan is an eleventh-grade student of law, international relations, and history studying at Shanghai American School, China. An author and a researcher of wisdom tales and history, he aspires to become a change-maker who one day will create a meaningful impact in social justice, international law, and diplomacy. He is always looking for opportunities for collaboration and partnerships.
                        </p>
                        </div>
                    
                    </div>

                    <div className={styles.contributor}>
                        <img src="http://www.spotaproject.com/files/lib/Photo_JasonL.png"/>

                        <div className={styles.description}>
                        <h1>Jason Li</h1>
                        <h3>Cofounder</h3>
                        <br/>
                        <p>
                        Jason Li, studying in Dulwich Internaltional Highschool Zhuhai, is a chemistry student who found himself intrigued by the possibilities of programming. Wishing to discover more opportunities to crosslink other sciences into Chemistry, he wants to bring different student together online so that interesting ideas can be shared. 
                        </p>
                        </div>
                    </div>

                    <div className={styles.contributor}>
                        <img src="http://www.spotaproject.com/files/lib/Photo_KevinXie.png"/>

                        <div className={styles.description}>
                        <h1>Kevin Xie</h1>
                        <h3>Board Member</h3>
                        <br/>
                        <p>
                        Kevin Xie, from DHZH. He finds Complex System Science, Artificial intelligence, and Mathematics thrilling. Kevin believes that by designing such a system for SPOT, he will positively benefit students to find commonalities among their interests, connecting up stars to shine even brighter at an early age.
                        </p>
                        </div>
                    </div>

                    <div className={styles.contributor}>
                        <img src="http://www.spotaproject.com/files/lib/Photo_KevinNi.png"/>

                        <div className={styles.description}>
                        <h1>Kevin Ni</h1>
                        <h3>Board Member</h3>
                        <br/>
                        <p>
                        His introduction....
                        </p>
                        </div>
                    </div>

                    <div className={styles.contributor}>
                        <img src="http://www.spotaproject.com/files/lib/Photo_FreyaS.png"/>

                        <div className={styles.description}>
                        <h1>Freya Shao</h1>
                        <h3>Board Member</h3>
                        <br/>
                        <p>
                        Freya From Dulwich Zhuhai. And she have studied media for seven years. She is interested in physics and art.
                        </p>
                        </div>
                    </div>

                    <div className={styles.contributor}>
                        <img src="http://www.spotaproject.com/files/lib/Photo_AlexanderZ.png"/>

                        <div className={styles.description}>
                        <h1>Alexander Zhang</h1>
                        <h3>Board Member</h3>
                        <br/>
                        <p>
                        His introduction.... 
                        </p>
                        </div>
                    </div>
                        
                </Space>
                

            <br/>
            <br/>
            <br/>
            </div>

            <Footer/>
           
        </div>
        
    )
}

