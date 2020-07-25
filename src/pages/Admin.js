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
    const [theme, setTheme] = useState(props.theme.dark)

    console.log(props.user)

    if(props.user.login){
        return(
            <div style={{color: props.theme.fontColor}}>
                <div className={"dashboard"} style={{marginLeft: 20, marginTop: 20, marginRight: 20, flexDirection: 'column', color: props.theme.fontColor}}>
                    <h3 style={{color: props.theme.fontColor, textDecorationLine: 'underline'}}>Dashboard</h3>
                    <p>Welcome back {props.user.user.email}</p>

                    <div style={{backgroundColor: props.theme.boxColor, padding: 20, borderRadius: 3}}>
                    <h4 style={{color: props.theme.fontColor}}>About</h4>
                    <Input.TextArea style={{padding: 10, fontSize: 10}} rows={6} onPressEnter={()=>{console.log("Completed")}} allowClear/>
                    <Button style={{marginTop: 20}}>Confirm Changes</Button>
                    </div>
                   
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