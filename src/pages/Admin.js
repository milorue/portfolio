import React, {useEffect, useState} from 'react';
import './Admin.css';

// third party libraries
import {Drawer, Button, Row, Col, Input, message, Switch} from 'antd'
import {MenuOutlined, RocketFilled, ExperimentFilled, ToolFilled, PhoneFilled, UserOutlined, LockOutlined} from '@ant-design/icons'
import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'

import NavBar from '../components/navbar'

function Admin(props){

    const [about, setAbout] = useState("")
    const [navVisible, setNavVisible] = useState(false)
    const [theme, setTheme] = useState(props.theme.dark)

    const revealNav = () => {
        setNavVisible(true)
    }
    
    const hideNav = () => {
        setNavVisible(false)
    }

    console.log(props.user)

    if(props.user.login){
        return(
            <div style={{color: props.theme.fontColor}}>
                <div className={"dashboard"} style={{marginLeft: 20, marginTop: 20, flexDirection: 'column'}}>
                    <h3 style={{color: props.theme.fontColor, textDecorationLine: 'underline'}}>Dashboard</h3>
                    <p>Welcome back {props.user.user.email}</p>
                </div>
    
            </div>
        )
    }
    else{
        return(
            <div style={{marginLeft: 20, marginTop: 20, flexDirection: 'column'}}>
                <p>Not logged in :(</p>
            </div>
        )
    }

    
}

export default Admin