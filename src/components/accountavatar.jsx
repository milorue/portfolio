import React, {useState} from 'react'
import {Avatar, Button} from 'antd'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'

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
    const [account, setAccount] = useState(null)

    const {loading: accountLoading, error: accountError, data: accountData} = useQuery(GET_USER,
        {
            variables: {token: props.token}
        })

    if(accountData){
        if(accountData.getUser.userId !== ""){
            return(
                <Button icon={<UserOutlined/>} onClick={() => {console.log("AccountClick")}} type={"text"} style={{backgroundColor: props.theme.backgroundColor, color: props.theme.fontColor , textAlign: 'center', marginRight: 20}}>
                    Account
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