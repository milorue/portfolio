import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Card, Tag, Tooltip, Typography} from 'antd'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {LoadingOutlined, DatabaseFilled, GithubOutlined, DesktopOutlined} from '@ant-design/icons'
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
                        <Card style={{borderColor: 'transparent', borderRadius: 5, borderWidth: 0}} cover={<img style={{color: props.theme.fontColor ,height: 200, width: "100%"}} className={"cardImg"} src={project.image}/>} bodyStyle={{borderColor: "transparent", height: 250, textAlign: 'left' ,backgroundColor: props.theme.boxColor, color: props.theme.fontColor}} hoverable>
                            <h4 style={{color: props.theme.fontColor}}>{project.name}</h4>
                            <Typography.Paragraph ellipsis={{rows: 3}} style={{fontSize: 10}}>{project.description}</Typography.Paragraph>
                            <Row style={{marginTop: 10}}>
                                <Button href={project.links[0]} type={"text"} size={'large'}>{<DesktopOutlined style={{color: props.theme.fontColor}}/>}</Button>
                                <Button href={project.repos[0]}type={"text"} size={'large'}>{<GithubOutlined style={{color: props.theme.fontColor}}/>}</Button>
                            </Row>
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