import React, { useCallback, useRef, useState } from "react";

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
    Divider,
    Modal,
    Space,
    Tooltip,
    message,
    Checkbox
} from "antd"

import ReactCanvasConfetti from "react-canvas-confetti";

export function ProjectDescription() {
    const canvasStyles = {
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
      };
    const refAnimationInstance = useRef(null);
    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);
    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
        refAnimationInstance.current({
            ...opts,
            origin: { y: 0.7 },
            particleCount: Math.floor(300 * particleRatio)
        });
    }, []);
    const fire = useCallback(() => {
        makeShot(0.25, {
        spread: 26,
        startVelocity: 55
        });

        makeShot(0.2, {
        spread: 60
        });

        makeShot(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
        });

        makeShot(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
        });

        makeShot(0.1, {
        spread: 120,
        startVelocity: 45
        });
    }, [makeShot]);

    const projList = [
        {
            title: "Aim of the project",
            des: "How will the results of the organization look like"
        },
        {
            title: "Recent plans",
            des: "Targets that have already being achieve; Things that has yet to be done; etc."
        },
        {
            title: "Time of initiation",
            des: " "
        },
        {
            title: "Location",
            des: "Where are you based?"
        },
        {
            title: "Type",
            des: "for-profit, non-profit, or service"
        },
        {
            title: "Target audience",
            des: "Age, interests, etc."
        },
    ]
    const teamList = [
        {
            title: "Skills required for the project",
            des: "How is it gonna work, and how much time would they need to dedicate to this project."
        },
        {
            title: "Members and role",
            des: "Existing members, and vacancies"
        },

    ]

    const [ projList_C, setProjList_C ] = useState(new Array(projList.length).fill(false))
    const [ teamList_C, setTeamList_C ] = useState(new Array(teamList.length).fill(false))
    const [ pop, setPop ] = useState(false);
    function close(){
        setPop(false)
    }
    

    function updateCheckList(type, id){
        if (type == "proj") {
            let list = projList_C;
            list.splice(id, 1, !projList_C[id]) //Array.splice(start_index, delete_count, value1, value2, value3, ...)
            setProjList_C(list)
        } else if (type == "team") {
            let list = teamList_C;
            list.splice(id, 1, !teamList_C[id]) //Array.splice(start_index, delete_count, value1, value2, value3, ...)
            setTeamList_C(list)
        }

        let count = 0;
        const target = projList.length + teamList.length
        projList_C.map( (item)=>{ if(item){ count += 1 } } )
        teamList_C.map( (item)=>{ if(item){ count += 1 } } )

        let left = target - count

        if (left == 0) { fire() }
        else {
          if (left != 1) message.success("🎉 " + left + " key points left")
          else message.success("🎉 " + left + " key point left")
        }
    }
  
    return (
        <div>
            <span style={{ color: '#666666' }}>
               <ul>
                   <li> While you are describing yout project, please feel free to use the checklist below. They will definitely provide guidiance and help you to explore your project more thoroughtly.</li>
                   <li>It will provide guidiance on how to best present your website to others! If you are having troubles, check out this tutorial &nbsp;
                    <Tooltip title="Explore tips to a great project report on SPOT">
                        <Button
                            onClick={()=>setPop(true)}
                            type="primary"
                            shape="round"
                            size="small"
                        >tutorial</Button>
                    </Tooltip>
                   </li>
               </ul>
            </span>
          
            <p></p>

            <p><strong><span style={{ fontSize: '16px' }}><span style={{ color: '#666666' }}><u>Project Description </u></span> </span></strong>
            </p>
            <p />
            {
                projList.map( 
                    (item, id) => (
                        <div key={id}>
                            <Checkbox onClick={()=>updateCheckList("proj", id)}>
                                <strong><span style={{ color: '#666666' }}>{item.title}</span></strong>
                            </Checkbox>
                            { projList_C[id] ? "🎉": null }
                            <p style={{ textIndent: '2em' }}><span style={{ color: '#666666' }}>{item.des}</span></p>
                        </div>
                    )
                )
            }
            


            <p><strong><span style={{ fontSize: '16px' }}><span style={{ color: '#666666' }}><u>Team Description</u></span></span></strong></p>
            <p />
            {
                teamList.map( 
                    (item, id) => (
                        <div key={id}>
                            <Checkbox onClick={()=>updateCheckList("team", id)}>
                                <strong><span style={{ color: '#666666' }}>{item.title}</span></strong>
                            </Checkbox>
                            { teamList_C[id] ? "🎉": null }
                            <p style={{ textIndent: '2em' }}><span style={{ color: '#666666' }}>{item.des}</span></p>
                        </div>
                    )
                )
            }

            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
            <Modal
                visible={pop}
                onOk={()=>close()}
                onClose={()=>close()}
                onCancel={()=>close()}
                title={"Tutorial"}
                width={1000}
                style={{ top: 8 }}
            >
                <iframe 
                    src="http://www.spotaproject.com/files/posts/59.html"
                    style={{
                        width: 950,
                        height: 560,
                        border: "none"
                    }}
                >

                </iframe>
            </Modal>
        </div>
    )
}

