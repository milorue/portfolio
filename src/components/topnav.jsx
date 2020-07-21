import React, {useState} from 'react';
import './topnav.css';
import NavBar from './components/navbar'
import AccountAvatar from './components/accountavatar.jsx'

// ant design
import { Button, Row, Drawer, Input, message, Switch, Modal } from 'antd';
import {MenuOutlined, UserOutlined, LockOutlined} from '@ant-design/icons'

import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'

const LOGIN = gql`
  query login($email: String!, $password: String!){
    login(email: $email, password: $password){
      token
      refreshToken
      login
      user{
        userId
        email
      }
    }
  }
`

const LOGOUT = gql`
  query logout($token: String!){
    logout(token: $token)
  }
`

const client = new ApolloClient({
  uri: "https://milorue.herokuapp.com/"
})

const themes = {
  light: {
    name: 'Light',
    backgroundColor: 'white',
    fontColor: 'black',
    secondaryBackgroundColor: 'whitesmoke',
    buttonColor: '#28262C',
    boxColor: 'lightgrey',
    switchColor: 'lightgrey',
    iconColor: '#43BC8F',
    secondaryButtonColor: "#946FC3",
  },
  dark: {
    name: "Dark",
    backgroundColor: '#101010',
    fontColor: 'whitesmoke',
    secondaryBackgroundColor: '#14171A',
    buttonColor: '#30475E',
    switchColor: '#30475e',
    boxColor: '#21262b',
    iconColor: '#69C9A5',
    secondaryButtonColor: "#794BB4",
  }
}

function TopNav(){
  const [navVisible, setNavVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const [theme, setTheme] = useState(themes.dark)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [user, setUser] = useState({token: ""})

  let [login , {loading: loginLoad, data: loginData}] = useLazyQuery(LOGIN, {
    onCompleted: data => {
      setUser(data.login)
      if(data.login.login){
        message.success({
          content: "Logged in as: " + data.login.user.email
        })
        setLoginVisible(false)
      }
      else{
        message.error({
          content: "Incorrect login info"
        })
      }
      
      
    },
    onClick: data => {
      console.log(data)
    }
  })

  let [logout, {loading: logoutLoad, data: logoutData}] = useLazyQuery(LOGOUT, {
    onCompleted: data => {
      loginData = null
      if(data){
        setUser({token: ""})
      }
      window.location.reload(false);
    }
  })

  if(user.token !== ""){
    if(user.login){

    }
    else{
    }
  }

  const onLogin = () => {
    login({variables: {email: username, password: password}})
  }

  const onLogout = () => {
    logout({variables: {token: user.token}})
  }

  const revealLogin = () => {
    setLoginVisible(true)
  }

  const hideLogin = () => {
    setLoginVisible(false)
  }

  const revealNav = () => {
    setNavVisible(true)
  }

  const hideNav = () => {
    setNavVisible(false)
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const themeChange = event => {
    if(event){
      setTheme(themes.dark)
    }
    else{
      setTheme(themes.light)
    }
  }

  const renderAccountButtons = () => {
    if(user.token !== ""){
        return(
          <Row justify={'end'} style={{marginTop: 30}} align={'middle'}> 
            <AccountAvatar token={user.token} theme={theme}/>
            <Button onClick={onLogout} type={"text"} size={'medium'} style={{fontSize: 12, marginRight: 20, backgroundColor: theme.secondaryButtonColor, color: 'white'}}>Logout</Button>
            <Switch style={{marginRight: 30 , backgroundColor: theme.switchColor}} checkedChildren={"Dark"} unCheckedChildren={"Light"} onClick={themeChange} defaultChecked={true}/>
          </Row>
        )
    }
    else{
        return(
          <Row justify={'end'} style={{marginTop: 30}} align={'middle'}> 
            <Button onClick={revealLogin} type={"text"} size={'medium'} style={{fontSize: 12, marginRight: 20, backgroundColor: theme.secondaryButtonColor, color: 'white'}}>Login</Button>
            <Switch style={{marginRight: 30 , backgroundColor: theme.switchColor}} checkedChildren={"Dark"} unCheckedChildren={"Light"} onClick={themeChange} defaultChecked={true}/>
          </Row>
        )
    }
  }

  return(
    <div style={{backgroundColor: theme.backgroundColor, color: theme.fontColor, overflow: 'hidden'}}>
      <Modal title={"Login"} visible={loginVisible}
        onOk={hideLogin} onCancel={hideLogin} footer={[]} centered style={{height: "70vh"}}>
            <Input size={"large"} prefix={<UserOutlined style={{marginRight: 5}}/>}
            placeholder={"Username"}
            onChange={onChangeUsername} style={{marginBottom: 20}}/>
            <Input.Password size={"large"}
            prefix={<LockOutlined style={{marginRight: 5}}/>} 
            placeholder={"Password"} onChange={onChangePassword}/>
            <Button onClick={onLogin} type={"text"} style={{backgroundColor: theme.buttonColor, color: 'white', marginTop: 20}}>Login</Button>
        </Modal>

          <Drawer placement={'left'} closable={false} onClose={hideNav} visible={navVisible} maskStyle={{backgroundColor: 'transparent'}}>
            <NavBar/>
          </Drawer>

        <div className={'nav'}>
          <Button onClick={revealNav} size={'large'} icon={<MenuOutlined style={{color: theme.fontColor}}/>} style={{margin: 20}} type={"text"}/>
        </div>

        {renderAccountButtons()}
    </div>
  )
}

export default TopNav