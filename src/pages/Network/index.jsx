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

import TopNavBar from 'component/TopNavBar'
import styles from "./index.less"

import Explore from "component/Network/index.jsx"
import Footer from "component/Footer/index.jsx"

import {
    SearchLocation,
    ShowLocation
} from "component/Tags/locationTag.jsx"
import {
    SelectSubjects,
    ShowSubjects
} from "component/Tags/subject.jsx"
import {
    SelectAgeGroups,
    ShowAgeGroups
} from "component/Tags/ageGroup.jsx"

const { Search } = Input;
export default withRouter(Page)
function Page(props){
    const dispatch = useDispatch();
    const [ f, sf ] = useState(true);
    const [ tagList, setTagList ] = useState([]);
    const [ ageGroups, setAgeGroups ] = useState([]);
    const [ location, setLocation ] = useState({
        continent: null,
        country: null,
        province: null,
        city: null
    })
    const { userList } = useSelector(state => state.user);
    const [ searchT, setSearchT ] = useState("");
    const [ pop, setPop ] = useState(false);
    const sparkleFilterData = {
        location: location,
        subjects: tagList,
        ageGroups:ageGroups
    }
   
    function search(){
        const content = {
            content: searchT
        }
        if (searchT == "") {
            requestSparkleFilter(null, null)

        } else {
            dispatch(sparkleSearch(content))
        }
    }

    function requestSparkleFilter(data, type){
        let subjects_ = tagList;
        let location_ = location;
        let ageGroups_ = ageGroups;

        if(type=="subjects"){
            setTagList(data)
            subjects_ = data
        } else if(type=="location"){
            setLocation(data)
            location_ = data
        } else if(type=="ageGroups"){
            setAgeGroups(data)
            ageGroups_ = data
        }
        const requestData = {
            location: location_,
            subjects: subjects_,
            ageGroups:ageGroups_
        }

        dispatch(userFilter(requestData))
    }

    if (f){
        // dispatch(sparkleInflux())
        requestSparkleFilter(null, null)
        sf(false);
    }
    return (
        <div className={styles.mainContainer}>
            
            <TopNavBar/>
         
            <div className={styles.content}>
           
            {/* <Search 
                className={styles.search}
                onChange={(e)=>setSearchT(e.target.value)} 
                placeholder="input search text"  
                allowClear
                enterButton
                bordered={true}
                onSearch={()=>search()}
            /> */}
            <p/>
            <div onClick={()=>setPop(true)}>
                <Space wrap>
                    <ShowSubjects subjects={tagList}/>
                    <ShowLocation location={location}/>
                    <ShowAgeGroups ageGroups={ageGroups}/>
                </Space>
            </div>

            <Divider/>
            
            <Explore userList={userList}/>

           

            </div>
            <Footer/>

            <Modal
                title="Filter" 
                visible={pop} 
                onOk={()=>setPop(false)} 
                onCancel={()=>setPop(false)}
                closable
                mask
                maskClosable
                width={1080}
            >
                <h3>Location</h3>
                <SearchLocation 
                    onChange={(e)=>requestSparkleFilter(e, "location")}
                />
                <br/>
                <h3>Tags</h3>
                <SelectSubjects 
                    tagList={tagList} 
                    setTagList={(e)=>requestSparkleFilter(e, "subjects")}
                />
                <br/>
                <h3>Age Groups</h3>
                <SelectAgeGroups 
                    tagList={ageGroups} 
                    onChange={(e)=>requestSparkleFilter(e, "ageGroups")}
                />
            </Modal>
        </div>
        
    )
}

