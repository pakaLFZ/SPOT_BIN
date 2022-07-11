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
    Divider,
    Modal,
    Checkbox,
    Input,
    Button,
    Space,
    Tooltip
} from "antd"

import { 
    EyeInvisibleOutlined, 
    EyeTwoTone,
    SendOutlined,
} from '@ant-design/icons';

import {
    login,
    reg,
    emailVerification
} from 'actions/user'

import {
    email2url
} from "component/tools/general.jsx"

import styles from './index.less'
import Blue from "component/Blue/index.jsx"
import TopNavBar from 'component/TopNavBar'
import Footer from '../../component/Footer/index';
  
export default withRouter(Page)
function Page() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { user } = useSelector(state => state.user);
    const [ check, setCheck ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const [email_L, setEmail_L] = useState("");
    const [password_L, setPassword_L] = useState("");
    const [email_R, setEmail_R] = useState("");
    const [password_R, setPassword_R] = useState("");
    const [password_R2, setPassword_R2] = useState("");
    const [code, setCode] = useState("");
    const [display_name, setDisplay_name] = useState("");
    const message = "Please read and consent to our terms of service.";

    if (user){
        const url = "/user/" + email2url(user.email)
        // history.push("/user")
        window.location.replace(url)
    }

    function requestRegister(){
        if (!check) alert(message)
        else if (password_R != password_R2){
            alert("2 passwords are not identical. Please check them out. \n两次密码输入并不相同。请检查。")
        } else {
            const data = {
                "email": email_R,
                "password": password_R,
                "code":code,
                "display_name":display_name,
            }
            dispatch(reg(data), () => { setSubmitting(false) })
        }
    }
    function verify(){
        dispatch( emailVerification(email_R) )
    }
    function requestLogin(){
        if (!check) alert(message)
        else {
            const data = {
            "email": email_L,
            "password": password_L
            }
            dispatch(login(data), () => { setSubmitting(false) })
        }
    }

    return (
        <div>
            <TopNavBar back={true}/>
            <div className={styles.divider}>
                <Divider><h3>Login and Sign up</h3></Divider>
                <TermsofService visible={visible} setVisible={(e)=>setVisible(e)} setCheck={()=>setCheck(!check)}/>
            </div>
            <div className={styles.contentBox}>

                <div className={styles.card}>
                    <h2 className={styles.title}>Login</h2>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Input
                            className={styles.inputBox}
                            placeholder="Email"
                            value={email_L}
                            onChange={(e)=>setEmail_L(e.target.value)}
                        />
                        <Input.Password
                            placeholder="Password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e)=>setPassword_L(e.target.value)}
                            value={password_L}

                        />
                        <Button onClick={()=>requestLogin()}>Login</Button>
                    </Space>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.title}>Sign Up</h2>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Input
                            className={styles.inputBox}
                            placeholder="Email"
                            onChange={(e)=>setEmail_R(e.target.value)}
                            value={email_R}
                            suffix={
                                <Tooltip title="Send Verification Code">
                                  <SendOutlined 
                                    style={{ color: 'rgba(0,0,0,.45)' }}
                                    onClick={()=>verify()} 
                                />
                                </Tooltip>
                              }
                        />
                        <Input
                            className={styles.inputBox}
                            placeholder="Verification Code"
                            value={code}
                            onChange={(e)=>setCode(e.target.value)}
                        />
                        <Input
                            className={styles.inputBox}
                            placeholder="User Name"
                            value={display_name}
                            onChange={(e)=>setDisplay_name(e.target.value)}
                        />
                        <Input.Password
                            placeholder="Password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e)=>setPassword_R(e.target.value)}
                            value={password_R}
                        />
                        <Input.Password
                            placeholder="Repeat Password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e)=>setPassword_R2(e.target.value)}
                            value={password_R2}
                        />
                        <Button onClick={()=>requestRegister()}>Signup</Button>
                    </Space>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

function TermsofService(props){
    const visible = props.visible;
    const setVisible = props.setVisible;
    const setCheck = props.setCheck;
    return (
        <>
        <div className={styles.check}>
            <Checkbox onChange={()=>setCheck()} /> 
            <p>&nbsp;&nbsp;I have read and consent to the
                <span
                    onClick={()=>setVisible(true)}
                    className={styles.ToS}
                >
                &nbsp;terms of service
                </span>
            </p>

        </div>
        
        <Modal 
            title="Terms of service" 
            visible={visible} 
            onOk={()=>setVisible(!visible)} 
            onCancel={()=>setVisible(!visible)}
            width={1000}
        >
            <div>
                <p style={{textAlign: 'center'}} size={1} _root="[object Object]" __ownerid="undefined" __hash="undefined" __altered="false"><strong><u><span style={{fontSize: '20px'}}>Our Service</span></u></strong></p>
                <p />
                <p>S.P.O.T is a student-led, non-profit, &amp; royalty-free platform that allows students to share their passion
                projects, browse other youth initiatives, and connect with like-minded peers, For the best user experience on
                S.P.O.T., we need to be able to identify you and the areas of your interests so our site uses cookies. We will try
                to guarantee that all projects on our platform are safe, friendly, and most importantly, appropriate for you. </p>
                <p />
                <p><u><span style={{fontSize: '16px'}}>1. Using S.P.O.T - Who can use S.P.O.T?</span></u></p>
                <p className="MsoNormal">Our Service is available to all students. adults with expertise who are willing to commit to a
                mentor/advisor role for projects are also welcome. You may only use our Service once you have signed up using your
                email for safety reasons. </p>
                <p />
                <p><em>S.P.O.T. Community Guidelines</em></p>
                <p>To maintain a healthy community, we ask users to follow the following guidelines. Any users who violate the
                <em>S.P.O.T Community Guidelines </em>will no longer have access to this platform.</p>
                <p />
                <blockquote><strong>By consenting to the Terms of Service, you have agreed to help us maintain a positive, friendly and
                    healthy environment. You have hereby also</strong> <strong>given consent to The S.P.O.T</strong> <strong>Team to
                    remove, limit and block any distribution of antagonistic, explicit, false or misleading, harmful, hateful, or
                    violent content. S.P.O.T. also reserves the right to remove any</strong> <strong>account, individual, or group
                    from the platform.</strong></blockquote>
                <p />
                <p><u><span style={{lineHeight: '107%'}}>2.</span> Privacy &amp; Code of Conduct</u></p>
                <p />
                <p><em><span style={{fontSize: '14.5ptpx'}}><span style={{lineHeight: '104%'}}>-</span></span> Posting Projects &amp;
                    Comments</em></p>
                <p className="MsoNormal">S.P.O.T allows users to post content of their projects, including photos, project descriptions,
                contact information, comments, links and other related materials. Users will only be granted access to these
                functions once they have logged in to our website.</p>
                <p />
                <p><em><span style={{fontSize: '14.5ptpx'}}><span style={{lineHeight: '104%'}}>-</span></span> User Information</em></p>
                <p className="MsoNormal">To simplify the communication process between individuals, S.P.O.T may display information about
                the author, including their email account, bio, interests and a non-specified location (e.x. country &amp;
                timezone). By agreeing to the Terms of Service, you also agree to let S.P.O.T. publicly display any information you
                have entered on our website. Users are also bound to being responsible and professional when accessing said
                information. Users are also required to use their real names when using SPOT. </p>
                <p />
                <p><em><span style={{fontSize: '14.5ptpx'}}><span style={{lineHeight: '104%'}}>-</span></span> Code of Conduct</em></p>
                <p className="MsoNormal">All users of S.P.O.T are asked to show respect for the people, laws/regulations, moral codes, and
                environment while showing integrity, objectivity and professional behaviour. <strong><u>S.P.O.T. is not</u></strong>
                <strong><u>responsible for any of the content that users distribute.</u></strong></p>
                <p />
                <p><u><span style={{lineHeight: '107%'}}>3.</span> Security</u></p>
                <p className="MsoNormal">While the S.P.O.T Student Board works to protect the security of your content, we cannot guarantee
                that unauthorised third parties won’t be able infiltrate our code. So, we ask you to be mindful of information that
                you have posted. We also ask that you keep your password secure and that you notify us immediately of any
                compromises.</p>
                <p />
                <p><u><span style={{lineHeight: '107%'}}>4.</span> Accountability</u></p>
                <p className="MsoNormal">Though the S.P.O.T Student Board will be frequently monitoring the website for any explicit or
                inappropriate content, there may be events where offensive/uncensored content is displayed. By agreeing to our
                conditions, you are acknowledging that it is unlikely that S.P.O.T will be able to shield all explicit subjects, and
                are agreeing that they will not be held accountable for the damages it might create.</p>
                <p />
                <p><u><span style={{lineHeight: '107%'}}>5.</span> Your Responsibility</u></p>
                <p className="MsoNormal">S.P.O.T provides a positive and inspiring place for you and other users to discover projects and
                share your interests. To keep it that way, you must comply with our policies, including the <em>S.P.O.T Community
                    Guideline </em>and our Code of Conduct. You must not post any content that violates or encourages any conduct
                that violates laws or regulations, including but not limited to laws or regulations applicable to advertising. You
                are responsible for User Content and any third-party content on your posts and comments.</p>
            </div>
        </Modal>
        </>
    )
}
