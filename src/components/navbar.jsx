import React from 'react'
import {Row, Col, Button, Divider} from 'antd'
import {RocketFilled, ExperimentFilled, ToolFilled, PhoneFilled} from '@ant-design/icons'

import SocialLinks from './sociallinks'

function NavBar(props){
    return(
        <div className={'nav'}>
            
                <div style ={{}}>
                    <Button type={"text"} style={{width: "100%", textAlign: 'left'}}>
                        <h3>{<RocketFilled/>} About</h3>
                    </Button>
                </div>
                <Divider/>
                <div style={{marginTop: 10}}>
                    <Button type={"text"} style={{width: "100%", textAlign: 'left'}}>
                        <h3>{<ExperimentFilled/>} Skills</h3>
                    </Button>
                </div>
                <Divider/>
                <div style={{marginTop: 10}}>
                    <Button type={"text"} style={{width: "100%", textAlign: 'left'}}>
                        <h3>{<ToolFilled/>} Projects</h3>
                    </Button>
                </div>
                <Divider/>
                <div style={{marginTop: 10}}>
                    <Button type={"text"} style={{width: "100%", textAlign: 'left'}}>
                        <h3>{<PhoneFilled/>} Contact</h3>
                    </Button>
                </div>
                <Divider/>
                <div style={{marginTop: 20}}>
                <SocialLinks xs={6}/>
                </div>
                
                
        </div>
    )
}

export default NavBar