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
    getSparkleInfo,
    sparkleDelete,
    sparklePublish,
    comment_edit,
    comment_delete,
    commentReply_edit,
    commentReply_delete,
    comment_reply,
    comment_getDetails,
    getComments,
    sendComments,
    standFor,
    ban,
    members_fetch,
    members_setting,
} from 'actions/sparkle'

import {
    getUserData,
    deleteUserInfo_else
} from 'actions/user'


import {
    Button,
    Divider,
    Typography,
    Space,
    Tooltip,
    Comment,
    Input,
    Avatar,
    Modal,
    Card,
    Popover
} from "antd"

import {
    DeleteOutlined,
    LikeFilled,
    LikeOutlined,
    EditOutlined,
    SendOutlined,
    ArrowLeftOutlined,
    ShareAltOutlined,
    UserOutlined,
    EyeOutlined,
    SettingOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';

import {
    qrCodeLink,
    avatarLink
} from "component/config/general";

import TopNavBar from 'component/TopNavBar'
import Loading from 'component/Loading/index.jsx'
import Footer from "component/Footer/index.jsx";
import {
    email2url
} from "component/tools/general.jsx"
import {
    ShowSubjects
} from "component/Tags/subject.jsx";
import {
    ShowLocation
} from "component/Tags/locationTag.jsx";
import {
    ShowAgeGroups
} from "component/Tags/ageGroup.jsx";
import {
    ShowServiceStatus
} from "component/Tags/serviceStatus.jsx";

import { ZH, EN } from "component/config/language"

import styles from "./view.less"



const { Paragraph } = Typography;
const { Search } = Input;

export default withRouter(Page)
function Page(props) {
    const { projectId_L } = props.match.params;
    const history = useHistory();
    const {
        sparkleInfo,
        commentsInfo
    } = useSelector(state => state.sparkle);
    const dispatch = useDispatch();
    const {
        user,
    } = useSelector(state => state.user);


    const [f, sf] = useState(true)

    if (f) {
        dispatch(getSparkleInfo(projectId_L))
        dispatch(getComments(projectId_L));
        sf(false);
    }

    if (sparkleInfo.id != projectId_L) {
        return (
            <div>
                <Loading />
                <TopNavBar blue />
            </div>
        )
    } else {
        const link = "/user/" + sparkleInfo.author.email.replace(".", " ")
        return (
            <div className={styles.mainContainer}>
                <TopNavBar />
              
                <div className={styles.content}>

                    <h1>
                        {sparkleInfo.title}
                    </h1> 
                    

                    <Space wrap="wrap">
                    <ShowSubjects subjects={sparkleInfo.subjects} lock />
                    <ShowLocation location={sparkleInfo.location} detail lock />
                    <ShowAgeGroups ageGroups={sparkleInfo.ageGroups} lock />
                    <ShowServiceStatus serviceStatuses={sparkleInfo.serviceStatuses} lock/>
                    </Space>
                    <p/>
                    <br/>
                    <Back2Explore/>

                    {
                        !sparkleInfo.yours && sparkleInfo.serviceStatuses.indexOf("Recruiting") > -1 ?
                        <>
                            <Divider/>
                            <br/>
                            <br/>
                            <br/>
                            <center>
                                <ApplyButton sparkleInfo={sparkleInfo}/>
                            </center>
                            <br/>
                            <br/>
                            <br/>
                            <Divider/>
                        </>
                        : null
                    }


                    <Divider />


                    <h2>Mission Statement</h2>
                    <p>{sparkleInfo.mission}</p>

                    <br />
                    <h2>Project Description</h2>
                    <div
                        className="braft-output-content"
                        dangerouslySetInnerHTML={{ __html: sparkleInfo.content }}
                    />
                    <br />

                    <h2>Contact Information</h2>
                    <p>
                        {sparkleInfo.contact}
                    </p>
                    {
                        !sparkleInfo.yours && sparkleInfo.serviceStatuses.indexOf("Recruiting") > -1 ?
                        <>
                            <Divider/>
                            <br/>
                            <br/>
                            <br/>
                            <center>
                                <ApplyButton sparkleInfo={sparkleInfo}/>
                            </center>
                            <br/>
                            <br/>
                            <br/>
                            <Divider/>
                        </>
                        : null
                    }

                    <AuthorCard
                        info={sparkleInfo}
                        setShowPop={(e) => setShowPop(e)}
                    />

                    <Divider />
                    <Back2Explore/>
                    <Button
                        size="small"
                        type="text"
                    >
                        <EyeOutlined />
                        &nbsp;
                        {sparkleInfo.viewCount}
                    </Button>

                    <ActionBar history={history} />
                    

                    <br />
                    <br />
                    <br />
                    <br />

                    {user ?
                        null :
                        <LoginAd
                            setShowPop={(e) => setShowPop(e)}
                        />

                    }

                    <br />

                    <h2>Comments</h2>


                    <SendComment id={projectId_L} />
                    <br />

                    <div className={styles.comment}>

                        {
                            commentsInfo ?
                                commentsInfo.comments.map((item, id) => (
                                    <Comments
                                        item={item}
                                        key={id}
                                        sparkleId={sparkleInfo.id}
                                    />
                                )
                                ) :
                                <Loading />
                        }
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                </div>

                
                <Footer />
            </div>
        )
    }
}

export function AuthorCard(props) {
    const sparkleInfo = props.info;
    const info = sparkleInfo.author;
    const dispatch = useDispatch();
    const { memberInfo } = useSelector(state => state.sparkle);
    const { user, user_else } = useSelector(state => state.user);
    const url = "/user/" + email2url(info.email)

    const [ f, sf ] = useState(true);
    const [ pop, setPop ] = useState(false)
    const [ members, setMembers ] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function openPanel(){
        setPop(true)
        setMembers(memberInfo.members)
        dispatch(deleteUserInfo_else())
    }
    function searchUser(e){
        console.log(e);
        dispatch(getUserData(e));
    }
    function removeTag(item) {
        const itemId = members.indexOf(item);
        let members_ = members;
        members_.splice(itemId, 1)
        setMembers(members_);
        forceUpdate()
    }
    function attachTag(){
        const data = [...members, user_else]
        console.log(data);
        setMembers(data)
        forceUpdate()
    }
    function saveMembersInfo(){
        const data = {
            id: sparkleInfo.id,
            owner: memberInfo.owner,
            members: members
        }
        console.log("A2");
        dispatch(members_setting(data));
    }

    if (f) {
        dispatch(members_fetch(sparkleInfo.id));
        sf(false);
    }

    if (!memberInfo) return (<Card><Loading/></Card>)
    else return (
        <div>
        {/* <Card  hoverable> */}
            <p>Author Information</p>
            <div 
                // onClick={()=>userPageRedirect(info.email)}
                className={styles.author}
            >
                <Avatar
                    icon={<UserOutlined/>}
                    src={info.avatar ? avatarLink + info.avatar : null}
                    size="large"
                />
                <p></p>
                <h2>{info.display_name}</h2>
                <Paragraph copyable>{info.email}</Paragraph>
                <p>
                    <a href={url}>Click to view more</a>
                </p>
                {
                    sparkleInfo.yours ?
                    <Button
                        icon={<SettingOutlined/>}
                        shape="round"
                        onClick={()=>openPanel()}
                    />
                    : user?
                        user.admin ?
                        <Button
                            icon={<SettingOutlined/>}
                            shape="round"
                            onClick={()=>openPanel()}
                        />
                        : null
                    :null
                }
            </div>
            <p>Members</p>
            <div className={styles.members}>
                <Space size="middle" wrap>
                    {
                        memberInfo.members.map(
                            (item, id)=> (
                                <>
                                    <Popover
                                        content={<UserInfoShort data={item}/>}
                                        title={item.username}
                                        trigger="click"
                                        key={id}
                                    >
                                        <Popover
                                            content={<UserInfoShort data={item}/>}
                                            title={item.username}
                                            trigger="hover"
                                        >
                                            <Avatar
                                                icon={<UserOutlined/>}
                                                src={item.avatar ? avatarLink + item.avatar : null}
                                                size="large"
                                            />
                                        </Popover>
                                    </Popover>
                                </>
                            )
                        )
                    }
                </Space>

            </div>

            <Modal 
                visible={pop}
                onOk={()=>setPop(false)}
                onCancel={()=>setPop(false)}
                title="Edit Team Information"
            >
                <h3>Member List</h3>
                <Space size="middle">
                    {
                        members.map(
                            (item, id) => (
                                <Tooltip title="Click to remove" key={id}>
                                    <Avatar
                                        icon={<UserOutlined/>}
                                        src={item.avatar ? avatarLink + item.avatar : null}
                                        size="large"
                                        onClick={()=>removeTag(item)}
                                    />
                                </Tooltip>
                            )
                        )
                    }
                 
                </Space>
                
                <p/>
                <br/>
                <h3>Search User by email</h3>
                <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={(e)=>searchUser(e)}
                />
                <p/>
                <p>Results</p>
                {
                    user_else?
                    <>
                    <Tooltip title="Click to add">
                        <Avatar
                            icon={<UserOutlined/>}
                            src={user_else.avatar ? avatarLink + user_else.avatar : null}
                            size="large"
                            onClick={()=>attachTag(user_else)}
                        />
                    </Tooltip>
                    <p><span><strong>Email:&nbsp;</strong></span>{user_else.email}</p>
                    <p><span><strong>User Name:&nbsp;</strong></span>{user_else.username}</p>
                    </>
                    :
                    <Tooltip title="Waiting for Search Result">
                        <Avatar
                            icon={<UserOutlined/>}
                            size="large"
                        />
                    </Tooltip>
                }
                <p/>
                <br/>
                <br/>
                <Button
                    type="primary"
                    onClick={()=>saveMembersInfo()}
                >
                    Save
                </Button>

            </Modal>

         {/* </Card> */}
         </div>
    )
}

function UserInfoShort(props){
    const data = props.data;
    const url = "/user/" + email2url(data.email)

    return (
        <div onClick={()=>userPageRedirect(data.email)}>
            <Paragraph copyable>{data.email}</Paragraph>
            <p>
                {/* <i>Click to view more</i> */}
                <a href={url}>Click to view more</a>

            </p>
        </div>
    )
}

function userPageRedirect(email) {
    const url = "/user/" + email2url(email)
    window.location.replace(url)
}

function LoginAd() {
    function redirect_toLogin() {
        const url = "http://www.spotaproject.com/auth"
        window.location.replace(url)
    }
    return (
        <div className={styles.glassBackground}>
            <div className={styles.noticeCardB} onClick={() => redirect_toLogin()} hoverable>
                <center><p>Sign Up</p></center>
            </div>
            <div className={styles.noticeCardA} onClick={() => redirect_toLogin()} hoverable>
                <center><p>Login</p></center>
            </div>

        </div >
    )
}

function ActionBar(props) {
    const history = props.history;
    const dispatch = useDispatch();
    const { sparkleInfo } = useSelector(state => state.sparkle);
    const { user } = useSelector(state => state.user);


    function deletingSparkle() {
        dispatch(sparkleDelete(sparkleInfo.id))
    }
    function share() {
        const urls = window.location.href;
        const imgLink = qrCodeLink + urls + "&mhid=4BaRXl3omZ4hMHYqKNVSPq8"
        window.open("about:blank").location.href = imgLink
    }
    function publishSparkle() {
        dispatch(sparklePublish(sparkleInfo.id))
    }
    function editSparkle() {
        history.push("/edit")
    }
    function like() {
        dispatch(standFor(sparkleInfo.id))
    }
    return (
        <div className={styles.actionBar}>
            <Space size="small">
                {
                    user ?
                        <>
                            {
                                user.admin ?
                                    <>
                                        <Button
                                            onClick={() => dispatch(ban(sparkleInfo.id))}
                                            shape="circle"
                                            danger
                                        >
                                            BAN
                                        </Button>
                                        {
                                            !sparkleInfo.yours ?
                                                <Tooltip placement="top" title="Edit">
                                                    <Button
                                                        shape="circle"
                                                        icon={<EditOutlined />}
                                                        onClick={() => editSparkle()}
                                                    />
                                                </Tooltip>
                                                : null
                                        }
                                    </>
                                    : null
                            }

                        </>
                        : null

                }
                {
                    sparkleInfo.yours ?
                        <>
                            <Tooltip placement="top" title="Delete">
                                <Button
                                    type="danger"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={() => deletingSparkle()}
                                />
                            </Tooltip>
                            <Tooltip placement="top" title="Edit">
                                <Button
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    onClick={() => editSparkle()}
                                />
                            </Tooltip>
                        </>
                        : null
                }
                {
                    sparkleInfo.status == "draft" ?
                        <Tooltip placement="top" title="Publish">
                            <Button
                                type="primary"
                                icon={<SendOutlined />}
                                onClick={() => publishSparkle()}
                            >
                                PUBLISH
                            </Button>
                        </Tooltip>
                        : null
                }
                <Tooltip placement="top" title="Share">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ShareAltOutlined />}
                        size="medium"
                        onClick={() => share()}
                    />
                </Tooltip>
                <Tooltip placement="top" title="Like">
                    <Button
                        type="primary"
                        shape="round"
                        icon={
                            sparkleInfo.liked ?
                                <LikeFilled />
                                : <LikeOutlined />
                        }
                        size="medium"
                        onClick={() => like()}
                    >
                        {"  " + sparkleInfo.like}
                    </Button>
                </Tooltip>
                
            </Space>
        </div>
    )
}

function Comments(props) {
    const dispatch = useDispatch();
    const { commentDetails } = useSelector(state => state.sparkle)
    const item = props.item;
    const sparkleId = props.sparkleId;
    const key = props.key;
    const [replyId, setReplyId] = useState(null);
    const [commentsList, setCommentsList] = useState(null);
    const [details, setDetails] = useState(false);

    const buttonStyle = { fontSize: "14px" }
    const ownerAction = [
        <Tooltip key="comment-basic-like" title="Delete">
            <DeleteOutlined
                style={buttonStyle}
                onClick={() => DeleteComment()}
            />
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Edit">
            <span onClick={() => EditComment()}>
                <EditOutlined style={buttonStyle} />
            </span>
        </Tooltip>,
    ];
    const action = [
        <span
            onClick={() => {
                if (details) { setCommentsList(null); setDetails(false) }
                else {
                    setDetails(true)
                    const request = async () => { setCommentsList(null) }
                    request().then(dispatch(comment_getDetails(item.id))
                    )
                }
            }}
        >
            {details ? "Show less" : "Show more"}
        </span>,
        <span
            onClick={() => {
                replyId ?
                    setReplyId(null)
                    : setReplyId(item.id)
            }}
        >
            Reply to
        </span>,
    ]

    if (!item) return <></>
    if (commentDetails && !commentsList && details) {
        if (commentDetails.id == item.id) setCommentsList(commentDetails)
    }
    function EditComment() {
        const newComment = prompt(EN.Sparkle.comment.edit, item.content)
        if (newComment == null || newComment == "") {
            alert(EN.Sparkle.comment.edit_invalid)
        } else {
            const data = {
                id: item.id,
                content: newComment
            }
            const request = async () => dispatch(comment_edit(data));
            request().then(dispatch(getComments(sparkleId)))
        }
    }
    function DeleteComment() {
        if (confirm(EN.Sparkle.comment.delete)) {
            const request = async () => dispatch(comment_delete(item.id));
            request().then(dispatch(getComments(sparkleId)))
        }
    }
    function EditCommentReply(id, content) {
        const newComment = prompt(EN.Sparkle.comment.edit, content)
        if (newComment == null || newComment == "") {
            alert(EN.Sparkle.comment.edit_invalid)
        } else {
            const data = {
                id: id,
                content: newComment
            }
            const request1 = async () => dispatch(commentReply_edit(data));
            const request2 = async () => dispatch(getComments(sparkleId));
            const request3 = async () => dispatch(comment_getDetails(id));
            const request4 = async () => { setCommentsList(commentDetails) };

            request1().then(request2()).then(request3().then(request4()))
        }
    }
    function DeleteCommentReply(id) {
        if (confirm(EN.Sparkle.comment.delete)) {
            const request = async () => dispatch(commentReply_delete(id));
            request().then(dispatch(getComments(sparkleId)))
        }
    }

    return (
        <div key={key}>
            <Comment
                actions={item.yours ? [...ownerAction, ...action] : [...action]}
                content={item.content}
                author={item.user}
                avatar={
                    <Tooltip title={item.email}>
                        <Avatar src={item.avatar ? avatarLink + item.avatar : null} />
                    </Tooltip>
                }
                datetime={item.date}
                icon={item.avatar ? null : <UserOutlined />}
            >
                {
                    details && commentsList ?
                        commentsList.comments.map((comment, id) => (
                            <Comment
                                content={comment.content}
                                author={comment.user}
                                avatar={
                                    <Tooltip title={comment.email}>
                                        <Avatar src={comment.avatar ? avatarLink + comment.avatar : null} />
                                    </Tooltip>
                                }
                                icon={comment.avatar ? null : <UserOutlined />}
                                actions={
                                    item.yours ?
                                        [
                                            <Tooltip key="comment-basic-like" title="Delete">
                                                <DeleteOutlined
                                                    style={buttonStyle}
                                                    onClick={() => DeleteCommentReply(comment.id)}
                                                />
                                            </Tooltip>,
                                            <Tooltip key="comment-basic-dislike" title="Edit">
                                                <span onClick={() => EditCommentReply(comment.id, comment.content)}>
                                                    <EditOutlined style={buttonStyle} />
                                                </span>
                                            </Tooltip>,
                                        ]
                                        : null
                                }
                            />
                        ))
                        :
                        item.comments.map((comment, id) => (
                            <Comment
                                content={comment.content}
                                author={comment.user}
                                avatar={
                                    <Tooltip title={comment.email}>
                                        <Avatar src={comment.avatar ? avatarLink + comment.avatar : null} />
                                    </Tooltip>
                                }
                                icon={comment.avatar ? null : <UserOutlined />}
                                actions={
                                    comment.yours ?
                                        [
                                            <Tooltip key="comment-basic-like" title="Delete">
                                                <DeleteOutlined
                                                    style={buttonStyle}
                                                    onClick={() => DeleteCommentReply(comment.id)}
                                                />
                                            </Tooltip>,
                                            <Tooltip key="comment-basic-dislike" title="Edit">
                                                <span onClick={() => EditCommentReply(comment.id, comment.content)}>
                                                    <EditOutlined style={buttonStyle} />
                                                </span>
                                            </Tooltip>,
                                        ]
                                        : null
                                }
                            />
                        ))
                }
            </Comment>
            {
                replyId ?
                    <SendComment reply={item.id} placeholder={item.content} id={sparkleId} />
                    : null
            }
        </div>
    )
}

function SendComment(props) {
    const dispatch = useDispatch();
    const id = props.id;
    const reply = props.reply;
    const placeholder = "Reply to: " + props.placeholder;
    const { TextArea } = Input;
    const [comment, setComment] = useState("");
    let data_post = {}
    if (reply) {
        data_post = {
            content: comment,
            id: reply,
            citing: "#",
            anonymous: false,
        };
    } else {
        data_post = {
            content: comment,
            id: id,
            citing: "#",
            anonymous: false,
        }
    }

    function publishComments() {
        if (reply) {
            dispatch(comment_reply(data_post))
        } else {
            dispatch(sendComments(data_post))
        }

    }
    return (
        <div>
            <TextArea
                autoSize={{ minRows: 3, maxRows: 10 }}
                onChange={(e) => setComment(e.target.value)}
                placeholder={reply ? placeholder : "Leave a friendly comment."}
            />
            <div>
                <Button
                    className={styles.commentButton}
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={() => publishComments()}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

function ApplyButton(props){
    const sparkleInfo = props.sparkleInfo;
    const [ pop, setPop ] = useState(false)
    const grayBackground = {backgroundColor: "#f2f2f2"};
    return (
        <>
        {
            sparkleInfo.yours ?
            null :
            <Tooltip title="Apply to this project">
                <Button 
                    onClick={()=>setPop(true)}
                    shape="round"
                    size="large"
                >
                    APPLY
                </Button>
            </Tooltip>

        }

        <Modal 
            title="Apply" 
            visible={pop} 
            onOk={()=>setPop(false)} 
            onCancel={()=>setPop(false)}
        >
            <p>For now, please contact the organizer according to the following information. (such as send Emails or contact via WeChat)</p>
            <br/>
            <p style={grayBackground}>
                {sparkleInfo.contact}
            </p>

            <br/>
            <p>Or, you may contact the project manager by sending Emails</p>
            <br/>
            <center style={grayBackground}>
            <Paragraph copyable>{sparkleInfo.author.email}</Paragraph>
            </center>
            
            <br/>
            <p>Remember to do a thorough introduction of yourself, and explain why you are interested in this project, to the one you are contacting.</p>
        </Modal>
        </>
    )
}

function Back2Explore(){
    function redirect() {
        window.location.replace("/explore")
    }
    return (
        <Tooltip title='Return to the "Explore" page'>
            <Button
                size="large"
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={()=>redirect()}
            >
                EXPLORE
            </Button>
        </Tooltip>
    )
}