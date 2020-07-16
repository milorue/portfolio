import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Card, Tag, Tooltip} from 'antd'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {LoadingOutlined, DatabaseFilled} from '@ant-design/icons'
import './projects.css'

const GET_PROJECTS = gql`
query projects{
    projects{
        name
        description
        used
        links
        repos
        note
        image
    }
}
`

function Projects(props){
    const [projects, setProjects] = useState([])

    const {loading: projectsLoading, error: projectsError, data: projectData} = useQuery(GET_PROJECTS)

    useEffect(() => {
        if(projectData){
            setProjects(projectData.projects)
        }
    })

    const renderProjects = () => {
        if(projects.length > 0){
            return projects.map((project) => {
                return(
                    <Col xs={24} sm={12} md={8} lg={6} key={project.name} style={{width: "100%"}}>
                        <Card cover={<img style={{height: 200, width: "100%"}} className={"cardImg"} src={project.image}/>} bodyStyle={{height: 200, textAlign: 'left' ,backgroundColor: props.theme.boxColor}}>
                            <h4>{project.name}</h4>
                            <p style={{fontSize: 10}}>{project.description}</p>
                            <Button>Test</Button>
                        </Card>
                    </Col>
                )
            })
        }
        else if(projectsLoading){
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
            <Row gutter={[20,20]} style={{paddingBottom: 10}}>
                {renderProjects()}
            </Row>
        </div>
    )
}

export default Projects