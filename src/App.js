import React, {useState} from 'react';
import './App.css';

// third party libraries
import { motion } from 'framer-motion'
import {Drawer, Button, Row, Col, Input, message, Switch, Modal} from 'antd'
import {MenuOutlined, RocketFilled, ExperimentFilled, ToolFilled, PhoneFilled, UserOutlined, LockOutlined} from '@ant-design/icons'
import ReactTypingEffect from 'react-typing-effect'
import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'

import NavBar from './components/navbar'
import SocialLinks from './components/sociallinks'
import GraphQLEditor from './components/graphqleditor'
import Skills from './components/skills'
import Projects from './components/projects'
import AccountAvatar from './components/accountavatar.jsx'

// static data
import about from './data/about_metadata'
import skills from './data/skills_metadata'
import project from './data/project_metadata'

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

function App() {

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

  return (


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
          

        <div className={'header'}>
          
          <div>
            <h1 style={{color: theme.fontColor}}>Milo Rue | {<ReactTypingEffect text={["Web & Mobile Developer", "Software Engineer", "Full-Stack Developer", "React Enthusiast"]} style={{color: '#69C9A5'}}/>}</h1>  
          </div>

          <SocialLinks xs={6} theme={theme}/>

          <Button type={'text'} size={"large"} style={{backgroundColor: theme.buttonColor, color: 'white'}} href={"https://docdro.id/LePG3ZX"} target={"_blank"}>Resume</Button>

        </div>

        <div id={"about"} className={"about"} style={{backgroundColor: theme.secondaryBackgroundColor, paddingTop: 30, paddingBottom: 30}}>
          
          <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3 style={{color: theme.iconColor}}>{<RocketFilled/>} About</h3>
              <p>{about}</p>
            </Col>
          </Row>
          <Row style={{textAlign: 'left', marginBottom: 30}} justify={'center'}>
            <Col xs={23} md={18} lg={18}>
              <h4 style={{color: theme.fontColor}}>Query all about me:</h4>
              <div style={{height: 400}}>
              <GraphQLEditor/>
              </div>
              
            </Col>
            
          </Row>
        </div>

        <div id={"skills"} className={"skills"} style={{paddingTop: 30, paddingBottom: 30}}>
          <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3 style={{color: theme.iconColor}}>{<ExperimentFilled/>} Skills</h3>
              <p>{skills}</p>
            </Col>
          </Row>
          <Row style={{textAlign: 'left', marginBottom: 30, marginLeft: 20, marginRight: 20}} justify={'center'}>
            <Col xs={20}>
              <Skills type={"WEB"} name={"Web"} theme={theme}/>
              <Skills type={"MOBILE"} name={"Mobile"} theme={theme}/>
              <Skills type={"DATABASE"} name={"Databases"} theme={theme}/>
              <Skills type={"LANGUAGE"} name={"Languages"} theme={theme}/>
            </Col>
            
          </Row>
        </div>

        <div id={"projects"} className={"projects"} style={{backgroundColor: theme.secondaryBackgroundColor, paddingTop: 30, paddingBottom: 30}}>
        <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3 style={{color: theme.iconColor}}>{<ToolFilled/>} Projects</h3>
              <p>{project}</p>
            </Col>
          </Row>

          <Row style={{textAlign: 'left', marginBottom: 30, marginLeft: 20, marginRight: 20}} justify={'center'}>
            <Col xs={20} style={{textAlign: 'center'}}>
              <Projects theme={theme}/>
            </Col>
            
          </Row>
        </div>

        <div id={"contact"} className={"contact"} style={{paddingTop: 30, paddingBottom: 30}}>
        <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3 style={{color: theme.iconColor}}>{<PhoneFilled/>} Contact</h3>
              <p>Email: milorue@gmail.com</p>
              <p>LinkedIn: https://www.linkedin.com/in/milorue/</p>
            </Col>
          </Row>
        </div>

        <div className={"footer"}>
        <Row style={{paddingTop: 70, paddingBottom: 70, textAlign: 'center', backgroundColor: 'lightgrey'}} justify={'center'}>
            <Col xs={24}>
              <p style={{color: 'black'}}>Made with 💜 by Milo Rue ©</p>
              <SocialLinks xs={1} theme={{fontColor: 'black'}}/>
            </Col>
          </Row>
        </div>
      </div>

    
  );
}

export default App;
