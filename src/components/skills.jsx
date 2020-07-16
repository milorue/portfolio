import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Divider, Card, Tag, Tooltip} from 'antd'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {LoadingOutlined, DatabaseFilled} from '@ant-design/icons'

import "./skills.css"

const GET_SKILLS = gql`
query skills{
    skills{
        name
        type
        yearsofexperience
        note
        tags
    }
}
`


function Skills(props){

    const [skills, setSkills] = useState([])

    const {loading: skillsLoading, error: skillsError, data: skillsData} = useQuery(GET_SKILLS)


    useEffect(() =>{
        if(skillsData){
            setSkills(skillsData.skills)
        }
    })

    function renderSkillTags(tags){
        if(tags.length > 0){
            return tags.map((tag) =>{
                return(
                    <Tag style={{fontSize: 11}} key={tag}>{tag}</Tag>
                )
            })
        }
    }

    const renderSkills = () => {
        if(skills.length > 0){
            return skills.map((skill) => {
                if(skill.type === props.type){
                    return(
                        <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4} key={skill.name}>
                            <Tooltip style={{fontSize: 10}} title={"View Projects"}>
                            <Card className={"raisedbox"} style={{height: 200, backgroundColor: props.theme.boxColor, color: props.theme.fontColor , borderColor: 'transparent', borderRadius: 5}} hoverable>
                            <p>{skill.name}</p>
                            <p style={{fontSize: 10}}>Years of Experience: {skill.yearsofexperience}</p>
                            {renderSkillTags(skill.tags)}
                            </Card>
                            </Tooltip>
                            
                        </Col>
                    )
                }
                
            })
        }
        else if(skillsLoading){
            return(
                <Col justify={"center"}>
                    <p>{<LoadingOutlined/>} Loading...</p>
                    
                </Col>
            )
        }

        else{
            return(
                <Col justify={"center"}>
                    <p>No Data {<DatabaseFilled/>}</p>
                </Col>
            )
        }
    }
    


    return(
        <div>
            <h3 style={{color: props.theme.fontColor}}>{props.name}</h3>
            <Row gutter={[20,20]} style={{paddingBottom: 10}}>
            {renderSkills()}
            </Row>
        </div>
        
            
    )
}

export default Skills