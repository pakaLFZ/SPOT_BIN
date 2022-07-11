import React, {
    useState,
} from 'react'

import {
    useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的

import {
    requestAddSubject,
    requestAgeGroupList
} from 'actions/tags'

import {
    Space,
    Tooltip,
    Button,
} from "antd"

import { 
    PlusOutlined
} from '@ant-design/icons';

export function SelectAgeGroups(props){
    const tagsInfo = props.tagList;
    const output = props.onChange;
    const single = props.single;
    const dispatch = useDispatch();
    const { ageGroups } = useSelector(state => state.tags);
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
        if (single){
            const data = [item.title]
            setTagList(data)
            output(data);
            forceUpdate()
        } else {
            const data = [...tagList, item.title]
            setTagList(data)
            output(data);
            forceUpdate()
        }
        
    }
    function requestAddTag() {
        const title = prompt("Enter the name of your tag here")
        dispatch(requestAddSubject(title))
    }


    if (f){
        dispatch(requestAgeGroupList())
        if (tagList) setTagList(tagsInfo)
        sf(false);
    }

    return (
        <div>
            <Space wrap>
                {  
                ageGroups?
                    <>
                    {
                        ageGroups.map(
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
                    </>

                : <p>Loading...</p>
                }
            </Space>
        </div>
    )

}

export function ShowAgeGroups(props){
    const ageGroups_ = props.ageGroups;
    const small = props.small;
    const lock = props.lock;
    const shrink = props.shrink;

    let ageGroups = ageGroups_;
    let shrinked = false;
    if (shrink && ageGroups.length >=2 ){
        ageGroups = ageGroups.slice(0, 2);
        shrinked = true;
    }

    function EmptyTag(){
        return (
            <>
            <Tooltip title={lock?null:"Click to select"}>
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
                        "No Age Group Specified" :
                        "Select Age Groups"
                    }
                </Button>
            </Tooltip>
            </>
            
        )
    }
  
    if (ageGroups){
       if (ageGroups.length > 0){
            return (
                <>
                <Space wrap>
                    {
                        ageGroups.map(
                            (item, id)=> (
                                <Button
                                    shape="round"
                                    key={id}
                                    size={
                                        small?
                                        "small"
                                        : null
                                    }
                                    type="text"
                                    style={{color:"orange"}}
                                >
                                    <strong>{item}</strong>
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

