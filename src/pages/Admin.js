import React, {useEffect, useState} from 'react';
import './Admin.css';

// third party libraries
import { motion } from 'framer-motion'
import {Drawer, Button, Row, Col, Input, message, Switch} from 'antd'
import {MenuOutlined, RocketFilled, ExperimentFilled, ToolFilled, PhoneFilled, UserOutlined, LockOutlined} from '@ant-design/icons'
import ReactTypingEffect from 'react-typing-effect'
import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'

import NavBar from '../components/navbar'
import SocialLinks from '../components/sociallinks'
import GraphQLEditor from '../components/graphqleditor'
import Skills from '../components/skills'
import Projects from '../components/projects'

// static data
import about from '../data/about_metadata'
import skills from '../data/skills_metadata'
import project from '../data/project_metadata'
import Modal from 'antd/lib/modal/Modal';

function Admin(props){

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

    const [about, setAbout] = useState("")
    const [navVisible, setNavVisible] = useState(false)
    const [theme, setTheme] = useState(themes.dark)

    const revealNav = () => {
        setNavVisible(true)
    }
    
    const hideNav = () => {
        setNavVisible(false)
    }

    return(

        <div style={{backgroundColor: theme.backgroundColor, color: theme.fontColor, overflow: 'hidden'}}>

            <Drawer placement={'left'} closable={false} onClose={hideNav} visible={navVisible} maskStyle={{backgroundColor: 'transparent'}}>
                <NavBar/>
            </Drawer>

            <div className={'nav'}>
                <Button onClick={revealNav} size={'large'} icon={<MenuOutlined style={{color: theme.fontColor}}/>} style={{margin: 20}} type={"text"}/>
            </div>

            <div className={'header'}>
                <div>
                    <h1 style={{color: theme.fontColor}}>Milo Rue | {<ReactTypingEffect text={["Web & Mobile Developer", "Software Engineer", "Full-Stack Developer", "React Enthusiast"]} style={{color: '#69C9A5'}}/>}</h1>
                </div>
            </div>


        </div>
    )
}

export default Admin