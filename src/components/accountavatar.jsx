import React, {useState, useEffect} from 'react'
import {Avatar, Button, message} from 'antd'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {useHistory} from 'react-router-dom'

import {UserOutlined} from '@ant-design/icons'

const GET_USER = gql`
    query getUser($token: String!){
        getUser(token: $token){
            userId
            email
        }
    }
`

function AccountAvatar(props){

    const history = useHistory()

    const [account, setAccount] = useState(null)

    const {loading: accountLoading, error: accountError, data: accountData} = useQuery(GET_USER,
        {
            variables: {token: props.token}
        })

    const onAccount = () => {
        if(props.token){
            console.log(props.token)
            history.push("/dashboard", props.token)
        }
        else{
            message.error({
                content: "Session expired"
            })
        }
    }
        
    if(accountData){
        
        if(accountData.getUser.userId !== ""){
            return(
                <Button icon={<UserOutlined/>} onClick={onAccount} type={"text"} style={{backgroundColor: props.theme.backgroundColor, color: props.theme.fontColor , textAlign: 'center', marginRight: 20}}>
                    {accountData.getUser.email}
                </Button>
                
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    else{
        return(
            <div></div>
        )
    }
}

export default AccountAvatar