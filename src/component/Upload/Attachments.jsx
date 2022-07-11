import React, {
    useState,
    useEffect
  } from 'react'


export default function Page(props){
    const downloadLink = "http://mofish.pro/files/docs/"
    const header = <p>附件 Attachments</p>
    const list = props.list;
    if (list) {
        return(
            <div>
                {
                    list.map(
                        (item, id)=>(
                            <>
                            <a href={downloadLink + item.fileName} target="_blank"> 
                                {item.name} 
                            </a>
                            <br/>
                            </>
                        )
                    )
                      
                }
            </div>
        )
    } else {
        return (
            <p></p>
        )
    }
    
}