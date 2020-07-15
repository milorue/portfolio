import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Divider, Card, Tag} from 'antd'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'

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
                            <Card className={"raisedbox"} style={{height: 200}} hoverable>
                            <p>{skill.name}</p>
                            <p style={{fontSize: 10}}>Years of Experience: {skill.yearsofexperience}</p>
                            {renderSkillTags(skill.tags)}
                            </Card>
                            
                        </Col>
                    )
                }
                
            })
        }
        else{
            return(
                <div><p>Test</p></div>
            )
        }
    }
    


    return(
        <div>
            <h3>{props.name}</h3>
            <Row gutter={[20,20]}>
            {renderSkills()}
            </Row>
            <Divider/>
        </div>
        
            
    )
}

export default Skills