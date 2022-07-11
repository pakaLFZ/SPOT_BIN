import React, {
    Suspense
} from 'react'

import {
    withRouter,
    useHistory
} from 'react-router-dom'

import {
    // useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的

import TopNavBar from 'component/TopNavBar'
import Loading from '../../component/Loading/index'
import Footer from "component/Footer/index.jsx"


const Post_I = React.lazy(() => import('component/Post/post.jsx'));
const Post = (props) => (
  <Suspense fallback={<Loading/>}>
    <Post_I edit={props.edit}/>
  </Suspense>
)
// import Post from "component/Post/post.jsx"
export default withRouter(Page)
function Page(props){
    const history = useHistory()
        return (
            <>
                <TopNavBar/>
                <Post edit/>
                <Footer/>
            </>
        )
}