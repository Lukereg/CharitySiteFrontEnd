import React from 'react';
import styles from './DropdownList.module.scss'
import { Link } from "react-router-dom"

const DropdownList = (props) => {
        return(
            <div className={styles.dropdown}>
                <Link to="/eventTypeChoose"><div className={styles.a}>{props.titlebutton}</div></Link>
                <div className={styles.dropdownContent}>
                    <Link to="/getVolunteering"><div className={styles.a}>{props.data1}</div></Link>
                    <Link to="/getFundraising"><div className={styles.a}>{props.data2}</div></Link>
                    <Link to="/getEvents"><div className={styles.a}>{props.data3}</div></Link>
                </div>
            </div>
        )
}

export default DropdownList
