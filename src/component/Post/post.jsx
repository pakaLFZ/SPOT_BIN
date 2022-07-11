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
    sendSparkle,
    sparklePublish,
    sparkle_edit
} from 'actions/sparkle'

import {
    Input,
    Button,
    Result,
    Modal,
    Space,
    Tooltip,
    Switch 
} from "antd"

import {
    LeftSquareOutlined,
    CheckOutlined,
    CloseOutlined
  } from "@ant-design/icons"

import { postLink } from "component/config/general"

import BraftEditor from 'braft-editor';
import styles from './post.less'
import UploadButton from "component/Upload/Button.jsx"
import {
    SelectSubjects
} from "component/Tags/subject.jsx"
import { 
    SearchLocation,
} from 'component/Tags/locationTag.jsx'
import { 
    SelectAgeGroups,
} from 'component/Tags/ageGroup.jsx'
import {
    SelectServiceStatus,
} from "component/Tags/serviceStatus.jsx"
import {
    ProjectDescription
} from "./checkList"

export default withRouter(Page)
function Page(props){
    const { sparkleInfo } = useSelector(state => state.sparkle);
    const { user } = useSelector(state => state.user);

    const { TextArea } = Input;
    const dispatch = useDispatch();
    const history = useHistory();
    const edit = props.edit;
    const [ upload, setUpload ] = useState(false);
    const [ save, setSave ] = useState(true);
    const [ published, setPublished ] = useState(false);
    const [ contact, setContact ] = useState(null);
    const [ content, setContent ] = useState(null);
    const [ mission, setMission ] = useState(null);
    const [ name, setName ] = useState(null);
    const [ fileList, setFileList] = useState([]);
    const [ cover, setCover ] = useState(null);
    const [ serviceStatus, setServiceStatus ] = useState([]);
    const [ location, setLocation ] = useState(
        {
            continent: null,
            country: null,
            province: null,
            city: null
        }
    )
    const [ ageGroup, setAgeGroup ] = useState([])

    const [ f, sf ] = useState(true)
    const [ tagList, setTagList ] = useState([]);

    function post(){
        if (name && mission && content && location.city) {
            if (!cover) { 
                alert("Shall we upload a cover image?")
            } else {
                if (upload) {
                    const jsonData = {
                        id: sparkleInfo.id,
                        content: content,
                        mission: mission,
                        name: name,
                        cover: cover,
                        contact: contact,
                        subjects: tagList,
                        location: location,
                        ageGroup: ageGroup,
                        serviceStatuses: serviceStatus
                    }
                    dispatch(sparkle_edit(jsonData))
                } else {
                    const jsonData = {
                        content: content,
                        mission: mission,
                        name: name,
                        contact: contact,
                        cover: cover,
                        subjects: tagList,
                        location: location,
                        ageGroup: ageGroup,
                        serviceStatuses: serviceStatus
                    }
                    dispatch(sendSparkle(jsonData))
                }
                setSave(false)
            }
        }
        else {
            alert("Please fill in all necessary information! (Including location)")
        }
        


    }
    function refreshData(data){
        console.log(data);
        setFileList(data)
        updateContent("cover", data[0])
    }
    function publish(){
        dispatch(sparklePublish(sparkleInfo.id))
        setPublished(true)
    }
    function updateContent(type, content){
        if (type=="name") setName(content)
        else if (type=="mission") setMission(content)
        else if (type=="content") setContent(content)
        else if (type=="cover") setCover(content)
        else if (type=="contact") setContact(content)
        else if (type=="subjects") setTagList(content)
        else if (type=="location") setLocation(content)
        else if (type=="ageGroups") setAgeGroup(content)
        else if (type=="serviceStatus") setServiceStatus(content)


        setSave(true)
    }

    if(f) {
        if (edit) {
            if ( !sparkleInfo.id ) window.location.replace("/")
            setUpload(true);
            setContent(sparkleInfo.content);
            setContact(sparkleInfo.contact);
            setMission(sparkleInfo.mission);
            setName(sparkleInfo.title);
            setCover(sparkleInfo.cover);
            setTagList(sparkleInfo.subjects);
            setLocation(sparkleInfo.location);
            setAgeGroup(sparkleInfo.ageGroups);
            setServiceStatus(sparkleInfo.serviceStatuses);
        }
        sf(false)
    }
    if (!user){
        history.push("/auth")
    }

    if (published) return <Success/>
    else return (
        <div className={styles.mainContainer}>      

            <div className={styles.details}>
                <h1>
                    {
                        edit?
                        "Edit Project":
                        "Post a Project"
                    }
                </h1>
                <p/>
                <br/>
                <h2>Project Name</h2>
                <Input onChange={(e)=>updateContent("name", e.target.value)} value={name}/>

                <p/>
                <br/>
                <h2>Subjects</h2>
                <SelectSubjects tagList={tagList} setTagList={(e)=>updateContent("subjects", e)}/>

                <p/>
                <br/>
                <h2>Location</h2>
                <SearchLocation onChange={(e)=>updateContent("location", e)} location={location} details/>

                <p/>
                <br/>
                <h2>Age Group</h2>
                <SelectAgeGroups 
                    tagList={ageGroup}
                    onChange={(e)=>updateContent("ageGroups", e)} 
                />

                <p/>
                <br/>
                <h2>Project Status</h2>
                <SelectServiceStatus tagList={serviceStatus} setTagList={(e)=>updateContent("serviceStatus", e)}/>

                <p/>
                <br/>
                <h2>Upload Cover</h2>
                <UploadButton
                    setFileList={(e)=>refreshData(e)}
                    fileList={fileList}
                    actionType="post_file"
                />
                {
                    cover ?
                    <img src={postLink + cover} className={styles.cover}/>
                    : <h3>No Image</h3>
                }
                
                <p/>
                <br/>
                <h2>Mission Statement</h2>
                <TextArea onChange={(e)=>updateContent("mission", e.target.value)} value={mission}/>

                <p/>
                <br/>
                <h2>Project Description</h2>
                
                <ProjectDescription/>
                <Editor
                    iniContent={content} 
                    setContent={(e)=>updateContent("content", e)}
                />

                <p/>
                <br/>
                <h2>Contact</h2>
                <TextArea onChange={(e)=>updateContent("contact", e.target.value)} value={contact}/>
                

                <p/>
                <br/>
                <p/>
                <br/>
                <p/>
                <br/>
                <Space>
                        <Button type="primary" onClick={()=>post()}>
                            Save
                        </Button>
                   
                    {
                        edit?
                        null:
                        <Tooltip
                            title={
                                save?
                                "Please save your project first"
                                : "Publish your project"
                            }
                        >
                            <Button type="primary" onClick={()=>publish()} disabled={save}>
                                Publish
                            </Button>
                        </Tooltip>
                    }
                </Space>
                
            </div>
            <p/>
            <br/>
            <p/>
            <br/>
            <p/>
            <br/>
            
        </div>
    )
}

function Success(){
    function back(){
        window.location.replace("/explore")
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.success}>
                <Result
                    status="success"
                    title="Success"
                    subTitle="You have successfully posts your project on SPOT!"
                    extra={[
                    <Button type="primary" key="console" onClick={()=>back()}>
                        Explore
                    </Button>,
                    ]}
                />
            </div>
            
        </div>
        
    )
}

const myUploadFn = (param) => {

    const serverURL = '/api/databank/upload'
    const xhr = new XMLHttpRequest
    const fd = new FormData()
  
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: response.target.response.url,
        // meta: {
        //   id: 'xxx',
        //   title: 'xxx',
        //   alt: 'xxx',
        //   loop: true, // 指定音视频是否循环播放
        //   autoPlay: true, // 指定音视频是否自动播放
        //   controls: true, // 指定音视频是否显示控制栏
        //   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        // }
      })
    }
  
    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }
  
    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }
  
    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)
    xhr.responseType = 'json';
  
  
  
    fd.append('file', param.file)
    fd.append('actionType', "post_img")
    fd.append("uid", uuid())
  
    xhr.open('POST', serverURL, true)
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(fd)
  
}

class Editor extends React.Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this.props.iniContent)
    }

    async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = await fetchEditorContent()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent),
        })
    }

    // submitContent = async () => {
    //     // 在编辑器获得焦点时按下ctrl+s会执行此方法
    //     // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    //     const htmlContent = this.state.editorState.toHTML()
    //     // const result = await saveEditorContent(htmlContent)
    //     this.props.setContent(htmlContent);
    //     console.log(htmlContent);
    //     console.log(this.props.a);
    // }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
        const htmlContent = this.state.editorState.toHTML();
        this.props.setContent(htmlContent);
        console.log(htmlContent);
        // console.log(this.props.a);
    }

    render () {
        const { editorState } = this.state
        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    // onSave={this.submitContent}
                    media={{uploadFn: myUploadFn}}
                    language="en"
                />
            </div>
        )
    }
}

function uuid() {
    const len = 8;
    const radix = 16;
    //https://blog.csdn.net/mr_raptor/article/details/52280753
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    const radix_1 = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix_1];
    } else {
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | Math.random()*16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];

        }
        }
    }
    return uuid.join('');

}

function tagDataAnalysor(data){
    let tagList = []
    if (data){
        data.map(
            (item, id)=>{
                tagList = [ ...tagList, item.id]
            }
        )
    }
    
    return tagList
}
