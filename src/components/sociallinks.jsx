import React, {useEffect, useState} from 'react'

import {Col, Row, Button} from 'antd'

import {GithubFilled, LinkedinFilled, CodeFilled, InstagramFilled} from '@ant-design/icons'

function SocialLinks(props){


    const socials = [
        {
            key: 0,
            name: "Github",
            link: "https://github.com/milorue",
            icon: <GithubFilled style={{color: props.theme.fontColor}}/>
        },
        {
            key: 1,
            name: "LinkedIn",
            link: "https://www.linkedin.com/in/milorue/",
            icon: <LinkedinFilled style={{color: props.theme.fontColor}}/>
        },
        {
            key: 2,
            name: "Devpost",
            link: "https://devpost.com/MiloRue?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav",
            icon: <CodeFilled style={{color: props.theme.fontColor}}/>
        },
        {
            key: 3,
            name: "Instagram",
            link: "https://www.instagram.com/milorue/",
            icon: <InstagramFilled style={{color: props.theme.fontColor}}/>
        }

    ]

    const renderLinks = () =>{
        return socials.map((social) =>{
            return(
                <Col key={social.key} xs={props.xs}>
                    <Button size={'large'} icon={social.icon}
                    href={social.link} type={"text"} target={"_blank"}/>
                </Col>
            )
        })
    }

    return(
        <Row gutter={[20,20]} justify={'center'}>
            {renderLinks()}
        </Row>
    )
}

export default SocialLinks