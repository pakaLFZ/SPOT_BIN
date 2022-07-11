import React, {
    useState,
} from 'react'

import {
    Collapse ,
} from "antd"

import {
    withRouter,
    useHistory
} from 'react-router-dom'

import {
    useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的

import {
    userSparkleInflux
} from 'actions/sparkle'

import Loading from "component/Loading/index";
import Explore from "component/Explore/index";

const { Panel } = Collapse;

export default withRouter(Page);
function Page(props){
    const history = useHistory();
    const dispatch = useDispatch();
    const yours = props.yours;
    const email = props.email;
    const { userSparkleList } = useSelector(state => state.sparkle);

    const [ f, sf ] = useState(true);
    if (f){
        dispatch(userSparkleInflux(email));
        sf(false);
    }
    if (!userSparkleList) return <Loading/>
    else if (userSparkleList.yours) {
        return (
            <div>
                <Collapse defaultActiveKey={['draft']}>
                    <Panel header="Drafts" key="draft">
                        <Explore sparkleList={userSparkleList.draft}/>
                    </Panel>

                    <Panel header="Published" key="published">
                        <Explore sparkleList={userSparkleList.published}/>
                    </Panel>

                    <Panel header="Ban" key="ban">
                        <Explore sparkleList={userSparkleList.ban}/>
                    </Panel>
                </Collapse>

            </div>
        )
    } else return (
        <Explore sparkleList={userSparkleList.published}/>
    )
}
