import React, {useEffect, useState} from 'react';
import './App.css';

// third party libraries
import { motion } from 'framer-motion'
import {Drawer, Button, Row, Col, Input, Divider} from 'antd'
import {MenuOutlined, RocketFilled, ExperimentFilled, ToolFilled, PhoneFilled} from '@ant-design/icons'
import ReactTypingEffect from 'react-typing-effect'

import NavBar from './components/navbar'
import SocialLinks from './components/sociallinks'
import GraphQLEditor from './components/graphqleditor'
import Skills from './components/skills'

// static data
import about from './data/about_metadata'
import skills from './data/skills_metadata'
import project from './data/project_metadata'



function App() {

  const [navVisible, setNavVisible] = useState(false)

  const revealNav = () => {
    setNavVisible(true)
  }

  const hideNav = () => {
    setNavVisible(false)
  }

  return (


      <div>

          <Drawer placement={'left'} closable={false} onClose={hideNav} visible={navVisible} maskStyle={{backgroundColor: 'transparent'}}>
            <NavBar/>
          </Drawer>

        <div className={'nav'}>
          <Button onClick={revealNav} size={'large'} icon={<MenuOutlined />} style={{margin: 20}} type={"text"}/>
        </div>

        <div className={'header'}>
          
          <div>
            <h1>Milo Rue | {<ReactTypingEffect text={["Web & Mobile Developer", "Software Engineer", "Full-Stack Developer", "React Enthusiast"]}/>}</h1>  
          </div>

          <SocialLinks xs={6}/>

          <Button type={'text'} style={{backgroundColor: '#28262C', color: 'white'}} href={"https://docdro.id/LePG3ZX"}>Resume</Button>

        </div>

        <div className={"about"}>
          <Divider/>
          <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3>{<RocketFilled/>} About</h3>
              <p>{about}</p>
            </Col>
          </Row>
          <Row style={{textAlign: 'left', marginBottom: 30}} justify={'center'}>
            <Col xs={23} md={18} lg={18}>
              <h4>Query all about me:</h4>
              <div style={{height: 400}}>
              <GraphQLEditor/>
              </div>
              
            </Col>
            
          </Row>
          <Divider/>
        </div>

        <div className={"skills"}>
          <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3>{<ExperimentFilled/>} Skills</h3>
              <p>{skills}</p>
            </Col>
          </Row>
          <Row style={{textAlign: 'left', marginBottom: 30, marginLeft: 20, marginRight: 20}} justify={'center'}>
            <Col xs={20}>
              <Skills type={"WEB"} name={"Web"}/>
              <Skills type={"MOBILE"} name={"Mobile"}/>
              <Skills type={"DATABASE"} name={"Databases"}/>
              <Skills type={"LANGUAGE"} name={"Languages"}/>
            </Col>
            
          </Row>
        </div>

        <div className={"projects"}>
        <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3>{<ToolFilled/>} Projects</h3>
              <p>{project}</p>
            </Col>
          </Row>

          <Row style={{textAlign: 'left', marginBottom: 30, marginLeft: 20, marginRight: 20}} justify={'center'}>
            <Col xs={24} style={{textAlign: 'center'}}>
              <h4>Under Construction :(</h4>
            </Col>
            
          </Row>
        </div>
        <Divider/>

        <div className={"contact"}>
        <Row style={{margin: 20, textAlign: 'left'}} justify={'center'}>
            <Col xs={24} md={18} lg={12}>
              <h3>{<PhoneFilled/>} Contact</h3>
              <p>Email: milorue@gmail.com</p>
              <p>LinkedIn: https://www.linkedin.com/in/milorue/</p>
            </Col>
          </Row>
        </div>
        <Divider/>

        <div className={"footer"}>
        <Row style={{marginTop: 50, paddingTop: 50, paddingBottom: 20, textAlign: 'center', backgroundColor: 'lightgrey'}} justify={'center'}>
            <Col xs={24}>
              <p>Made with 💜 by Milo Rue ©</p>
              
            </Col>
          </Row>
        </div>
      </div>

    
  );
}

export default App;
