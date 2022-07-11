import React, {
    useState,
} from 'react'

import {
    useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的

import {
    requestSubjectList,
    requestAddSubject
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

export function SelectSubjects(props){
    const tagsInfo = props.tagList;
    const output = props.setTagList;
    const dispatch = useDispatch();
    const { subjects } = useSelector(state => state.tags);
    const [ tagList, setTagList ] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [ f, sf ] = useState(true);

    function removeTag(item) {
        const itemId = tagList.indexOf(item.title);
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
        dispatch(requestAddSubject(title))
    }


    if (f){
        dispatch(requestSubjectList())
        if (tagList) setTagList(tagsInfo)
        sf(false);
    }

    return (
        <div>
            <Space wrap>
                {  
                subjects?
                    <>
                    {
                        subjects.map(
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
                    <Tooltip title="Add Tag">
                    <Button
                        icon={<PlusOutlined/>}
                        shape="circle"
                        onClick={()=>requestAddTag()}
                    />
                    </Tooltip>
                    </>

                : <p>Loading...</p>
                }
            </Space>
        </div>
    )

}

export function ShowSubjects(props){
    const subjects_ = props.subjects;
    const small = props.small;
    const lock = props.lock;
    const shrink = props.shrink;
    let shrinked = false;

    let subjects = subjects_;
    if (shrink && subjects_.length >=3 ){
        subjects = subjects.slice(0, 2);
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
                        "No Tag Specified":
                        "Select Subjects"
                    }
                </Button>
            </Tooltip>
            </>
            
        )
    }
  
    if (subjects){
       if (subjects.length > 0){
            return (
                <>
                <Space wrap>
                    {
                        subjects.map(
                            (item, id)=> (
                                <Button
                                    key={id}
                                    shape="round"
                                    size={
                                        small?
                                        "small"
                                        : "middle"
                                    }
                                    style={{color:"#1890ff", fontWeight:"bold"} }
                                    type={
                                        small?
                                        null:
                                        "text"
                                    }
                                >
                                    {item}
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

