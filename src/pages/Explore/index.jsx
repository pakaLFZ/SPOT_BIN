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
    sparkleInflux,
    getTagSparkle,
    sparkleSearch,
    sparkleFilter,
    
} from 'actions/sparkle'

import {
    Input,
    Modal,
    Divider,
    Button,
    Space,
    Tooltip
} from "antd"

import {
    FilterOutlined  ,
    CheckOutlined ,
    BulbOutlined
} from '@ant-design/icons';

import TopNavBar from 'component/TopNavBar'
import styles from "./index.less"

import Explore from "component/Explore/index.jsx"
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
import {
    SelectServiceStatus,
    ShowServiceStatus
} from "component/Tags/serviceStatus.jsx"

const { Search } = Input;
export default withRouter(Page)
function Page(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const [ f, sf ] = useState(true);
    const [ tagList, setTagList ] = useState([]);
    const [ ageGroups, setAgeGroups ] = useState([]);
    const [ serviceStatuses, setServiceStatuses ] = useState([]);
    const [ location, setLocation ] = useState({
        continent: null,
        country: null,
        province: null,
        city: null
    })
    const { sparkleList } = useSelector(state => state.sparkle);
    const [ searchT, setSearchT ] = useState("");
    const [ pop, setPop ] = useState(false);
   
   
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
        let serviceStatuses_ = serviceStatuses;

        if(type=="subjects"){
            setTagList(data)
            subjects_ = data
        } else if(type=="location"){
            setLocation(data)
            location_ = data
        } else if(type=="ageGroups"){
            setAgeGroups(data)
            ageGroups_ = data
        } else if(type=="serviceStatuses"){
            setServiceStatuses(data)
            serviceStatuses_ = data
        }
        const requestData = {
            location: location_,
            subjects: subjects_,
            ageGroups:ageGroups_,
            serviceStatuses: serviceStatuses_,
        }


        dispatch(sparkleFilter(requestData))
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
           
            <div className={styles.search}>
                <Space wrap>
                    <Search 
                        className={styles.search}
                        style={{width:"200px"}}
                        onChange={(e)=>setSearchT(e.target.value)} 
                        placeholder="input search text"  
                        allowClear
                        enterButton
                        bordered={true}
                        onSearch={()=>search()}
                    />
                    <Tooltip title="Lets go post one of your meaningful project!">
                        <Button  
                            onClick={()=>history.push("/post")} 
                            type="primary"
                            shape="round"
                            icon={<BulbOutlined />}
                        >
                            Post a Project
                        </Button>
                    </Tooltip>
                </Space>
            </div>
            
            <p/>
            <div onClick={()=>setPop(true)}>
                <Space wrap>
                    <ShowSubjects subjects={tagList}/>
                    <ShowAgeGroups ageGroups={ageGroups}/>
                    <ShowServiceStatus serviceStatuses={serviceStatuses}/>
                    <ShowLocation location={location}/>
                    
                </Space>
            </div>

            <Divider/>
            
            <Explore sparkleList={sparkleList}/>
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
                <br/>
                <h3>Project Status</h3>
                <SelectServiceStatus 
                    tagList={tagList} 
                    setTagList={(e)=>requestSparkleFilter(e, "serviceStatuses")}
                />
            </Modal>
        </div>
        
    )
}

