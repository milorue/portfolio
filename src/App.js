import React, {useEffect, useState} from 'react';
import './App.css';

// third party libraries
import { motion } from 'framer-motion'
import {Drawer, Button, Row, Col, Input, Divider, Switch} from 'antd'
import {MenuOutlined, RocketFilled, ExperimentFilled, ToolFilled, PhoneFilled} from '@ant-design/icons'
import ReactTypingEffect from 'react-typing-effect'

import NavBar from './components/navbar'
import SocialLinks from './components/sociallinks'
import GraphQLEditor from './components/graphqleditor'
import Skills from './components/skills'
import Projects from './components/projects'

// static data
import about from './data/about_metadata'
import skills from './data/skills_metadata'
import project from './data/project_metadata'



function App() {

  const themes = {
    light: {
      backgroundColor: 'white',
      fontColor: 'black',
      secondaryBackgroundColor: 'whitesmoke',
      buttonColor: '#28262C',
      boxColor: 'lightgrey',
      switchColor: 'lightgrey',
      iconColor: '#43BC8F',
    },
    dark: {
      backgroundColor: '#101010',
      fontColor: 'whitesmoke',
      secondaryBackgroundColor: '#14171A',
      buttonColor: '#30475E',
      switchColor: '#30475e',
      boxColor: '#21262b',
      iconColor: '#69C9A5'
    }
  }

  const [navVisible, setNavVisible] = useState(false)
  const [theme, setTheme] = useState(themes.light)

  const revealNav = () => {
    setNavVisible(true)
  }

  const hideNav = () => {
    setNavVisible(false)
  }

  const themeChange = event => {
    if(event){
      setTheme(themes.dark)
    }
    else{
      setTheme(themes.light)
    }
  }

  return (


      <div style={{backgroundColor: theme.backgroundColor, color: theme.fontColor, overflow: 'hidden'}}>

          <Drawer placement={'left'} closable={false} onClose={hideNav} visible={navVisible} maskStyle={{backgroundColor: 'transparent'}}>
            <NavBar/>
          </Drawer>

        <div className={'nav'}>
          <Button onClick={revealNav} size={'large'} icon={<MenuOutlined style={{color: theme.fontColor}}/>} style={{margin: 20}} type={"text"}/>
        </div>

        <Row justify={'end'}> 
          <Switch style={{margin: 30, backgroundColor: theme.switchColor}} checkedChildren={"Dark"} unCheckedChildren={"Light"} onClick={themeChange}/>
        </Row>
          

        <div className={'header'}>
          
          <div>
            <h1 style={{color: theme.fontColor}}>Milo Rue | {<ReactTypingEffect text={["Web & Mobile Developer", "Software Engineer", "Full-Stack Developer", "React Enthusiast"]} style={{color: '#69C9A5'}}/>}</h1>  
          </div>

          <SocialLinks xs={6} theme={theme}/>

          <Button type={'text'} style={{backgroundColor: theme.buttonColor, color: 'white'}} href={"https://docdro.id/LePG3ZX"}>Resume</Button>

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
