import React, {useEffect, useState} from 'react';
import './Admin.css';

// third party libraries
import {Drawer, Button, Row, Col, Input, message, Switch} from 'antd'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {useLazyQuery, useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag'

import NavBar from '../components/navbar'

const UPDATE_ABOUT = gql`
    mutation updateAbout($token: String!, $about: String!, $id: String!){
        updateAbout(token: $token, about: $about, id: $id)
    }
`

const UPDATE_SKILLBLURB = gql`
    mutation updateSkillBlurb($token: String!, $skill: String!, $id: String!){
        updateSkillBlurb(token: $token, skill: $skill, id: $id)
    }
`

const UPDATE_PROJECTBLURB = gql`
    mutation updateProjectBlurb($token: String!, $project: String!, $id: String!){
        updateProjectBlurb(token: $token, project: $project, id: $id)
    }
`

const ABOUT = gql`
  query about{
    about{
      _id
      about
    }
  }
`

const SKILLBLURB = gql`
  query skillBlurb{
    skillBlurb{
      _id
      skills
    }
  }
`

const PROJECTBLURB = gql`
  query projectBlurb{
    projectBlurb{
      _id
      projects
    }
  }
`

function Admin(props){

    const [about, setAbout] = useState(null)
    const [projectBlurb, setPBlurb] = useState("")
    const [skillBlurb, setSBlurb] = useState("")
    const [theme, setTheme] = useState(props.theme.dark)

    let [updateAbout, {loading: updateAboutLoad, data: updateAboutData}] = useMutation(UPDATE_ABOUT, {
        onCompleted: data => {
            console.log(data)
        }
    })
    let [updateSkillBlurb, {loading: updateSkillBLoad, data: updateSkillBData}] = useMutation(UPDATE_SKILLBLURB, {
        onCompleted: data => {
            console.log(data)
        }
    })
    let [updateProjectBlurb, {loading: updateProjectBLoad, data: updateProjectBData}] = useMutation(UPDATE_PROJECTBLURB, {
        onCompleted: data => {
            console.log(data)
        }
    })


    const {loading: aboutLoading, error: aboutError, data: aboutData} = useQuery(ABOUT)
    const {loading: skillBLoading, error: skillBError, data: skillBData} = useQuery(SKILLBLURB)
    const {loading: projectBLoading, error: projectBError, data: projectBData} = useQuery(PROJECTBLURB)

    useEffect(() =>{
        if(aboutData){
          setAbout(aboutData.about.about)
        }
        if(skillBData){
          setSBlurb(skillBData.skillBlurb.skills)
        }
        if(projectBData){
          setPBlurb(projectBData.projectBlurb.projects)
        }
    }, [])

    const onAboutChange = event => {
        setAbout(event.target.value)
    }

    const onAboutReset = () => {
        setAbout(aboutData.about.about)
    }

    const onAboutConfirm = () => {
        updateAbout({variables: {token: props.user.token, about: about, id: aboutData.about._id}})
    }

    const onSkillBChange = event => {
        setSBlurb(event.target.value)
    }

    const onSkillBReset = () => {
        setSBlurb(skillBData.skillBlurb.skills)
    }

    const onSkillBConfirm = () => {
        updateSkillBlurb({variable: {token: props.user.token, skill: skillBlurb, id: skillBData.skillBlurb._id}})
    }

    const onProjectBChange = event => {
        setPBlurb(event.target.value)
    }

    const onProjectBReset = () => {
        setPBlurb(projectBData.projectBlurb.projects)
    }

    const onProjectBConfirm = () => {
        updateProjectBlurb({variables:{token: props.user.token, project: projectBlurb, id: projectBData.projectBlurb._id}})
    }

    const renderProjectBlurbButtons = () =>{
        if(projectBlurb !== projectBData.projectBlurb.projects){
            return(
                <div>
                    <Button icon={<CheckOutlined/>} type={"text"} style={{marginTop: 20, fontSize: 12, backgroundColor: '#44BB57', color: 'white'}} onClick={onProjectBConfirm}>Confirm</Button>
                    <Button icon={<CloseOutlined/>} type={"text"} style={{marginTop: 20, marginLeft: 20, fontSize: 12, backgroundColor: '#CB444F', color: 'white'}} onClick={onProjectBReset}>Cancel</Button>
                </div>
            )
        }
    }

    const renderAboutButtons = () => {
        if(about !== aboutData.about.about){
            return(
                <div>
                    <Button icon={<CheckOutlined/>} type={"text"} style={{marginTop: 20, fontSize: 12, backgroundColor: '#44BB57', color: 'white'}} onClick={onAboutConfirm}>Confirm</Button>
                    <Button icon={<CloseOutlined/>} type={"text"} style={{marginTop: 20, marginLeft: 20, fontSize: 12, backgroundColor: '#CB444F', color: 'white'}} onClick={onAboutReset}>Cancel</Button>
                </div>
            )
        }
        else{
            return(
                <div>

                </div>
            )
        }
    }

    const renderSkillBlurbButtons = () => {
        if(skillBlurb !== skillBData.skillBlurb.skills){
            return(
                <div>
                    <Button icon={<CheckOutlined/>} type={"text"} style={{marginTop: 20, fontSize: 12, backgroundColor: '#44BB57', color: 'white'}} onClick={onSkillBConfirm}>Confirm</Button>
                    <Button icon={<CloseOutlined/>} type={"text"} style={{marginTop: 20, marginLeft: 20, fontSize: 12, backgroundColor: '#CB444F', color: 'white'}} onClick={onSkillBReset}>Cancel</Button>
                </div>
            )
        }
        else{
            return(
                <div>

                </div>
            )
        }
    }

    const skillBEdit = () => {
        return(
            <div style={{backgroundColor: props.theme.boxColor, padding: 20, borderRadius: 3, marginTop: 20}}>
                <h4 style={{color: props.theme.fontColor}}>Skills</h4>
                <Input.TextArea value={skillBlurb} style={{padding: 10, fontSize: 10}} rows={6} onChange={onSkillBChange} allowClear/>
                {renderSkillBlurbButtons()}
            </div>
        )
    }

    const aboutEdit = () => {
        return(
            <div style={{backgroundColor: props.theme.boxColor, padding: 20, borderRadius: 3}}>
                <h4 style={{color: props.theme.fontColor}}>About</h4>
                <Input.TextArea value={about} style={{padding: 10, fontSize: 10}} rows={6} onChange={onAboutChange} allowClear/>
                {renderAboutButtons()}
            </div>
        )
    }

    const projectBEdit = () => {
        return(
            <div style={{backgroundColor: props.theme.boxColor, padding: 20, borderRadius: 3, marginTop: 20}}>
                <h4 style={{color: props.theme.fontColor}}>Projects</h4>
                <Input.TextArea value={projectBlurb} style={{padding: 10, fontSize: 10}} rows={6} onChange={onProjectBChange} allowClear/>
                {renderProjectBlurbButtons()}
            </div>
        )
    }

    if(props.user.login && aboutData){
        return(
            <div style={{color: props.theme.fontColor, height: "100vh"}}>
                <div className={"dashboard"} style={{marginLeft: 20, marginTop: 20, marginRight: 20, flexDirection: 'column', color: props.theme.fontColor}}>
                    <h3 style={{color: props.theme.fontColor, textDecorationLine: 'underline'}}>Dashboard</h3>
                    <p>Welcome back {props.user.user.email}</p>
                    {aboutEdit()}
                    {skillBEdit()}
                    {projectBEdit()}
                   
                </div>
    
            </div>
        )
    }
    else{
        return(
            <div style={{marginLeft: 20, marginTop: 20, flexDirection: 'column', height: "100vh"}}>
                <p>Not logged in :(</p>
            </div>
        )
    }

    
}

export default Admin