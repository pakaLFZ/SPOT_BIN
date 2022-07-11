import React, {
    useState,
} from 'react'

import {
    useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的

import {
    requestServiceStatusList,
    requestAddServiceStatus,
} from 'actions/tags'

import {
    Space,
    Tooltip,
    Button,
    Modal
} from "antd"

import { 
    PlusOutlined
} from '@ant-design/icons';

import styles from "./index.less"

export function SelectServiceStatus(props){
    const tagsInfo = props.tagList;
    const output = props.setTagList;
    const dispatch = useDispatch();
    const { serviceStatuses } = useSelector(state => state.tags);
    const [ tagList, setTagList ] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [ f, sf ] = useState(true);

    function removeTag(item) {
        const itemId = tagList.indexOf(item.title);
        console.log(itemId);
        let tagsData = tagList;
        tagsData.splice(itemId, 1)
        setTagList(tagsData);
        output(tagsData);
        forceUpdate()
    }
    function attachTag(item){
        const data = [...tagList, item.title]
        setTagList(data)
        output(data);
        forceUpdate()
    }
    function requestAddTag() {
        const title = prompt("Enter the name of your tag here")
        dispatch(requestAddServiceStatus(title))
    }


    if (f){
        dispatch(requestServiceStatusList())
        if (tagList) setTagList(tagsInfo)
        sf(false);
    }

    return (
        <div>
            <Space wrap>
                {  
                serviceStatuses?
                    <>
                    {
                        serviceStatuses.map(
                            (item, id)=>(
                                tagList.indexOf(item.title) > -1 ?
                                <Tooltip title="Remove" key={id}>
                                    <Button 
                                        type="primary"
                                        onClick={ ()=>removeTag(item)}
                                        shape="round"
                                    >{item.title}</Button>
                                </Tooltip>
                                : 
                                <Tooltip title="Add" key={id}>
                                    <Button
                                        onClick={()=>attachTag(item)}
                                        shape="round"
                                    >{item.title}</Button>
                                </Tooltip>
                            )
                        )
                    }
                    {/* <Tooltip title="Add Tag">
                    <Button
                        icon={<PlusOutlined/>}
                        shape="circle"
                        onClick={()=>requestAddTag()}
                    />
                    </Tooltip> */}
                    </>

                : <p>Loading...</p>
                }
            </Space>
        </div>
    )

}

export function ShowServiceStatus(props){
    const serviceStatuses_ = props.serviceStatuses;
    const small = props.small;
    const lock = props.lock;
    const shrink = props.shrink;
    let shrinked = false;

    let serviceStatuses = serviceStatuses_;
    if (shrink && serviceStatuses_.length >=3 ){
        serviceStatuses = serviceStatuses.slice(0, 2);
        shrinked = true;
    }
       

    function EmptyTag(){
        return (
            <>
            <Tooltip title="Click to select">
                <Button
                    shape="round"
                    size={
                        small?
                        "small"
                        : "middle"
                    }
                >
                    {
                        lock?
                        null:
                        "Select Status"
                    }
                </Button>
            </Tooltip>
            </>
            
        )
    }
  
    if (serviceStatuses){
       if (serviceStatuses.length > 0){
            return (
                <>
                <Space wrap>
                    {
                        serviceStatuses.map(
                            (item, id)=> (
                                <Button
                                    key={id}
                                    shape="round"
                                    size={
                                        small?
                                        "small"
                                        : "middle"
                                    }
                                    type="text"
                                    style={{color:"green"}}
                                >
                                    <strong>
                                        {item}
                                    </strong>
                                </Button>
                            )
                        )
                    }
                    {
                        shrinked?
                        <p>...</p>:
                        null
                    }
                 
                </Space>
                </>
            )
       } else {
           return (<EmptyTag/>)
       }
    } else {
        return (<EmptyTag/>)        
    }
}

