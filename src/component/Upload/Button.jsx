import React, {
  useState,
  useEffect
} from 'react'

import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';


export default function Page(props){
    const setFileList = props.setFileList;
    const buttonName = props.buttonName;
    const fileList = props.fileList;
    const actionType = props.actionType;
    const dispatch = useDispatch()
    const stop = props.stop;
    const [ uid, setUid ] = useState(uuid());
     
    function updateFileList(name){
        // const fileData = data.originFileObj;
        // console.log(name);
        const surfix = name.substring(name.lastIndexOf('.'))
        // console.log(surfix);
        // console.log(uid);
        // console.log(fileList);


        setFileList([...fileList, uid + surfix])
        
        if(actionType=="announcements"){
          setUid("main")
        } else {
          setUid(uuid())
        }       
    }

    const uploadProps = {
        name: 'file',
        data: { uid: uid, actionType: actionType},
        action: '/api/databank/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            console.log(info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
              updateFileList(info.file.name)
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    if (actionType=="avatar") {
      return (
        <Upload {...uploadProps}>
            {props.children}
        </Upload>
      )
    } else return(
        <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>{buttonName} </Button>
        </Upload>
    )
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

function listAnalysor(fileList){
  let data = [];
  for (let i=0;i<fileList.length;i++){
    const surfix = fileList[i].name.substring(fileList[i].name.lastIndexOf('.'))
    data = [...data, fileList[i].uid + surfix]
  }
  return data
}
