import React, {
    useState
} from 'react'

import styles from "./index.less";
import block1 from "assets/blue/block1.png"

export default function Page(props){
    return(
        <div className={styles.mainContainer}>
            <img className={styles.block1} src={block1}/>
        </div>
    ) 
}