import React, {useEffect, useState} from 'react';
import './App.css';

// third party libraries
import { motion } from 'framer-motion'
import {Drawer, Button, Row, Col, Input, message, Switch} from 'antd'
import {MenuOutlined, RocketFilled, ExperimentFilled, ToolFilled, PhoneFilled, UserOutlined, LockOutlined} from '@ant-design/icons'
import ReactTypingEffect from 'react-typing-effect'
import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'

import NavBar from './components/navbar'
import SocialLinks from './components/sociallinks'
import GraphQLEditor from './components/graphqleditor'
import Skills from './components/skills'
import Projects from './components/projects'

// static data
import about from './data/about_metadata'
import skills from './data/skills_metadata'
import project from './data/project_metadata'
import Modal from 'antd/lib/modal/Modal';