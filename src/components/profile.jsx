import React from 'react'
import {Row, Col, Button, Divider} from 'antd'
import {UserOutlined, IdcardOutlined} from '@ant-design/icons'

import "./profile.css"

function Profile(props){

    console.log(props.user)

    return(
        <div className={"profile"}>

            <div>
                <h2>Profile Information</h2>
            </div>

            <div>
                <h4>{<IdcardOutlined/>} : {props.user.user.userId}</h4> 
            </div>

            <div>
                <h4>{<UserOutlined/>} : {props.user.user.email}</h4> 
            </div>
        </div>
        
    )
}

export default Profile