// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

import React from 'react'
import styles from './EventBoxBoth.module.scss'
import { Box } from '@mui/system'
import PhotoContainer from '../PhotoContainer/PhotoContainer'
import {useNavigate} from 'react-router-dom';
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';

const EventBoxBoth = (props) =>{
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/login")
    }
    const truncate = (input) =>
      (input?.length > 200 && props.title.length > 60) ? `${input.substring(0, 250)}...` :
      (input?.length > 200 && props.title.length <= 60) ? `${input.substring(0, 150)}...` : input;

    return(
        <div>
        {
        props.atype === "normal" &&
        <Link style={{ textDecoration: 'none' }} to={{pathname: `/event/${props.charityId}`}}><Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={props.image}/>   
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>{truncate(props.description)}</h3>
                <h3 className={styles.h3}>Potrzebni wolontariusze: {props.volunteers}</h3>
                <ProgressBar progress={props.progress}/>   
            </Box></Link>
            }
        {
        props.atype === "verification" &&
        <Link style={{ textDecoration: 'none' }} to={{pathname: `/verification/${props.charityId}`}}><Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={props.image}/>   
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>{truncate(props.description)}</h3>
                <h3 className={styles.h3}>Potrzebni wolontariusze: {props.volunteers}</h3>
                <ProgressBar progress={props.progress}/>   
            </Box></Link>
            }
        {
        props.atype === "userNormal" &&
        <Link style={{ textDecoration: 'none' }} to={{pathname: `/myEvent/${props.charityId}`}}><Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={props.image}/>   
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>{truncate(props.description)}</h3>
                <h3 className={styles.h3}>Potrzebni wolontariusze: {props.volunteers}</h3>
                <ProgressBar progress={props.progress}/>   
            </Box></Link>
            }
        {
        props.atype === "userDeactivated" &&
        <Link style={{ textDecoration: 'none' }} to={{pathname: `/deactivatedEvent/${props.charityId}`}}><Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={props.image}/>   
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>{truncate(props.description)}</h3>
                <h3 className={styles.h3}>Potrzebni wolontariusze: {props.volunteers}</h3>
                <ProgressBar progress={props.progress}/>   
            </Box></Link>
            }
        {
        props.atype === "volunteer" &&
        <Link style={{ textDecoration: 'none' }} to={{pathname: `/volunteerEvent/${props.charityId}`}}><Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={props.image}/>   
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>{truncate(props.description)}</h3>
                <h3 className={styles.h3}>Potrzebni wolontariusze: {props.volunteers}</h3>
                <ProgressBar progress={props.progress}/>   
            </Box></Link>
            }
            {
        props.atype === "denied" &&
        <Link style={{ textDecoration: 'none' }} to={{pathname: `/deniedEvent/${props.charityId}`}}><Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={props.image}/>   
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>{truncate(props.description)}</h3>
                <h3 className={styles.h3}>Potrzebni wolontariusze: {props.volunteers}</h3>
                <ProgressBar progress={props.progress}/>   
            </Box></Link>
            }
        </div>
    )
}

export default EventBoxBoth